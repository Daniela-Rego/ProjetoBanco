import { Transfer } from "../../entities/transferencia";
import { INewTransfer } from "../../interfaces/transferInterface";
import { TransferRepositoryInterface } from "../../interfaces/transferRepositoryInterface";
import { v4 as uuidv4 } from 'uuid';

export class InMemoryTransferRepository implements  TransferRepositoryInterface {
    private transfers: Transfer[] = [];

    async save(transfer: INewTransfer): Promise<Transfer>{
        console.log("Salvando transferência",transfer);
        const date = new Date();
        const id = uuidv4();
    
        const newTransfer = new Transfer({
          numberAccountSender: transfer.numberAccountSender,
          numberAccountRecived: transfer.numberAccountRecived,
          valueTransfer: transfer.valueTransfer,
          created_at: date,
          id: id,
        });
    
        this.transfers.push(newTransfer);

       console.log("save InMemoryTransferRepository::",this.transfers)
        return newTransfer;
    };
   async  findById(id: any):Promise<Transfer>{
        console.log("findById::",id);
        console.log("findById this.transfers",this.transfers);
        const transferEncontrada = this.transfers.filter((transfer)=>{return transfer.id === id })
       console.log("transfer no findbyid",transferEncontrada);
       return transferEncontrada[0];
    };
    async listAll(): Promise<Array<Transfer>>{ 
      
      console.log("RepoInMemoryTransfer ::listAll():: ",this.transfers);
      return this.transfers;

    }
}