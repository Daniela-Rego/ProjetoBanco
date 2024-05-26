import { CreateTransfer } from "../services/create-transfer";
//import { TransferRepository } from "../repository/transferRepository";
//import { ContaRepository } from "../repository/contaRepository";
import { ContaRepositoryOrm } from "../repository/typeormRepository/contaRpositoryOrm";
import { TransferRepositoryOrm } from "../repository/typeormRepository/transferRepositoryOrm";
//import { RequestTransfer } from "../services/request-transfer";

export class TransferController{
    async createTransfer(req:any, res:any){
        const transferRepository=  new TransferRepositoryOrm();
        const contaRepository = new ContaRepositoryOrm();
        const createTranfer = new CreateTransfer(transferRepository,contaRepository);
       // const requestTransfer = new RequestTransfer(transferRepository,contaRepository);
       const createdTransfer = await createTranfer.saveTransfer(req.body);
        //const transfer= requestTransfer.executeTransfer(createdTransfer,1000,1000) ;
        
        return res.status(201).send('transferencia criada')
       
  
    }
}