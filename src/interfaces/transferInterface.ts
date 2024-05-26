
//interface da transferência
export interface ITransfer {
    numberAccountSender: number;
    numberAccountRecived: number;
    valueTransfer: number;
    created_at: Date;
    id?: string;
  }
  
//body da requisição
export interface INewTransfer {
    numberAccountSender: number;
    numberAccountRecived: number;
    valueTransfer: number;
  }
  