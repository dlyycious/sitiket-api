export class MakeResponse {
  public static send(statusCode: number, message: string) {
    return {
      statusCode,
      message,
    };
  }

  public static withData(statusCode: number, message: string, data: any) {
    return {
      statusCode,
      message,
      data,
    };
  }

  public static withError(statusCode: number, message: string, error: any) {
    return {
      statusCode,
      message,
      error,
    };
  }
}
