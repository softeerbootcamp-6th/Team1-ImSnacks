export class ApiError extends Error {
  status: number;
  code?: string;
  msg?: string;
  data?: unknown;

  constructor(status: number, code?: string, msg?: string, data?: unknown) {
    super(msg || 'API Error');
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
