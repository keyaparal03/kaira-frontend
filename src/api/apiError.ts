class ApiError extends Error {
  statusCode: number;
  errorData?: unknown;

  constructor(
    message: string,
    statusCode: number,
    errorData?: unknown
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorData = errorData;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(
        this,
        ApiError
      );
    }
  }
}

export default ApiError;