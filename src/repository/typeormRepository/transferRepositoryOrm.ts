import ConnectionSource  from "../../database/dataSource"
import { TransferenciasOrm } from "../../database/entities/TransferenciasOrm";
import { Transfer } from "../../entities/transferencia";
import { INewTransfer } from "../../interfaces/transferInterface";
import { TransferRepositoryInterface } from "../../interfaces/transferRepositoryInterface";
import { v4 as uuidv4 } from 'uuid';

export class TransferRepositoryOrm implements TransferRepositoryInterface {
  private repo = ConnectionSource.getRepository(TransferenciasOrm);
  private transfers: Transfer[] = [];

  listAll(): Promise<Transfer[]> {
    throw new Error("Method not implemented.");
  }
 

  async save(transfer: INewTransfer): Promise<Transfer> {
    console.log("Salvando transferência", transfer);
    const date = new Date();
    const id = uuidv4();
    console.log("dentro do save transfer: ",date)

    const newTransfer = new Transfer({
      numberAccountSender: transfer.numberAccountSender,
      numberAccountRecived: transfer.numberAccountRecived,
      valueTransfer: transfer.valueTransfer,
      created_at: date,
      id: id
    });

    const query = `insert into transferencias_orm (id,numberaccountsender, numberaccountrecived, valuetransfer,created_at) values($1,$2,$3,$4,now());`
    const value = [newTransfer.id, newTransfer.numberAccountSender, newTransfer.numberAccountRecived, newTransfer.valueTransfer]
    console.log(query, value)
    await this.repo.query(query, value);
    console.log('passei')
    return newTransfer;
  };
  async findById(id: any): Promise<Transfer> {
    console.log("findById::", id);
    const query = `select * from transferencias_orm where id='${id}' `
    console.log("query findById", query);
    const transferEncontrada = await this.repo.query(query);
    console.log('transferEncontrada:::',transferEncontrada)

    return transferEncontrada[0];
  };
}