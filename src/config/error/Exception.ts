type ErrorCode = 'E0000' | 'E0001' | 'E0002' | 'E0003' | string

export class Exception<T extends ErrorCode> extends Error {
  errorCode: T
  statusCode: number
  status: string
  isOperational: boolean
  constructor(errorCode: T, message: string, statusCode: number) {
    super(message)
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)
  }
}

