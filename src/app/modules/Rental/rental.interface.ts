import { RentalStatus } from "@prisma/client";

export type TRentalItem = {
  gearItemId: string;
  quantity: number;
};

export type TCreateRental = {
  startDate: string;
  endDate: string;
  items: TRentalItem[];
};

export type TRentalFilterRequest = {
  status?: RentalStatus;
};