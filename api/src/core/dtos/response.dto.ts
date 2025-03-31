export class ResponseDto<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public message?: string,
    public errors?: object,
  ) {}

  static success<T>(data: T, message?: string): ResponseDto<T> {
    return new ResponseDto(true, data, message || 'Done successfully');
  }

  static error(message: string, errors?: object): ResponseDto<null> {
    return new ResponseDto(false, null, message, errors);
  }
}
