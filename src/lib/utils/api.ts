export class ApiResponse<T = any> extends Error {
  constructor(
    public message: string,
    public code: number,
    public status: boolean = false,
    public data?: T,
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiResponse.prototype);
  }
}
