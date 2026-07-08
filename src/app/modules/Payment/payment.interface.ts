export type TCreatePayment = {
  rentalOrderId: string;
};

export type TConfirmPayment = {
  paymentIntentId: string;
};