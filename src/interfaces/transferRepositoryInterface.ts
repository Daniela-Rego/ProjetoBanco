import { Transfer } from "../entities/transferencia";
import { INewTransfer } from "./transferInterface";

export interface TransferRepositoryInterface {
    save(transfer:INewTransfer): Promise<Transfer>;
    findById(id:any): Promise<Transfer>;
    //findAllByConta(conta:any): Promise<Transfer>;//todas as transferencias de uma conta
  //  listAll():Promise<Array<Transfer>>;
    //listall2(): Promise<Transfer[]>
}
