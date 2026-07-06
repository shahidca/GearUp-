export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
};

export type TJwtPayload = {
  userId: string;
  email: string;
  role: string;
};