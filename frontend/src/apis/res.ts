export type ApiRes<T = unknown> = {
  code: number | string;
  msg: string;
  data: T;
};
