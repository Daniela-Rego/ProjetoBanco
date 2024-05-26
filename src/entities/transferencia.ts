import { ITransfer } from "../interfaces/transferInterface";


export class Transfer implements ITransfer {
  private params: ITransfer;

  constructor(attributes: ITransfer) {
    this.isValidate(attributes);
    this.params = attributes;
  }

  get numberAccountSender() {
    return this.params.numberAccountSender;
  }

  get numberAccountRecived() {
    return this.params.numberAccountRecived;
  }

  get valueTransfer() {
    return this.params.valueTransfer;
  }

  get id() {
    return this.params.id;
  }

  get created_at() {
    return this.params.created_at;
  }

  isValidate(attributes: ITransfer) {
    const { numberAccountSender, numberAccountRecived, valueTransfer } =
      attributes;

    if (!!numberAccountSender && !!numberAccountRecived && !!valueTransfer) {
      return;
    }

    throw new Error('Numero da conta inavlido');
  }
}
