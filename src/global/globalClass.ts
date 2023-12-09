export class ResponseData<D> {
  data: D | D[];
  status: boolean;
  message: string;

  constructor(data: D | D[], status: boolean, message: string) {
    this.message = message;
    this.status = status;
    this.data = data;

    return this;
  }
}
