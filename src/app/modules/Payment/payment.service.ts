import { JwtPayload } from "jsonwebtoken";
import { PaymentStatus, RentalStatus } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

import { prisma, stripe } from "../../config";
import AppError from "../../errors/AppError";

const createPayment = async (
  user: JwtPayload,
  rentalOrderId: string
) => {
  // Find Rental
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: rentalOrderId,
      customerId: user.userId,
    },
    include: {
      payment: true,
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  // Only confirmed rental can be paid
  if (rental.status !== RentalStatus.CONFIRMED) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only confirmed rentals can be paid"
    );
  }

  // Already paid
  if (
    rental.payment &&
    rental.payment.status === PaymentStatus.COMPLETED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This rental has already been paid"
    );
  }

  // Stripe amount must be integer (smallest currency unit)
  const amount = Math.round(
    Number(rental.totalAmount) * 100
  );

  // Create Payment Intent
  const paymentIntent =
    await stripe.paymentIntents.create({
      amount,
      currency: "bdt",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        rentalOrderId: rental.id,
        customerId: user.userId,
      },
    });

  // Create or Update Payment Record
  const payment = await prisma.payment.upsert({
    where: {
      rentalOrderId: rental.id,
    },
    update: {
      paymentIntentId: paymentIntent.id,
      amount: rental.totalAmount,
      status: PaymentStatus.PENDING,
    },
    create: {
      rentalOrderId: rental.id,
      paymentIntentId: paymentIntent.id,
      amount: rental.totalAmount,
      currency: "BDT",
      status: PaymentStatus.PENDING,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    payment,
  };
};


const confirmPayment = async (
  paymentIntentId: string
) => {

  const paymentIntent =
    await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

  if (
    paymentIntent.status !== "succeeded"
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Payment not completed"
    );
  }

  const payment =
    await prisma.payment.findUnique({
      where: {
        paymentIntentId,
      },
    });

  if (!payment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Payment not found"
    );
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.COMPLETED,
        transactionId:
          paymentIntent.id,
        paidAt: new Date(),
      },
    }),

    prisma.rentalOrder.update({
      where: {
        id: payment.rentalOrderId,
      },
      data: {
        status: RentalStatus.PAID,
      },
    }),
  ]);

  return {
    message:
      "Payment confirmed successfully",
  };
};

const getMyPayments = async (
  user: JwtPayload
) => {
  const payments = await prisma.payment.findMany({
    where: {
      rentalOrder: {
        customerId: user.userId,
      },
    },
    include: {
      rentalOrder: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const getPaymentById = async (
  user: JwtPayload,
  paymentId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      rentalOrder: {
        customerId: user.userId,
      },
    },
    include: {
      rentalOrder: {
        include: {
          rentalItems: {
            include: {
              gearItem: true,
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Payment not found"
    );
  }

  return payment;
};

export const PaymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};