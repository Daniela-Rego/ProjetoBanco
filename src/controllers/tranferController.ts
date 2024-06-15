import { CreateTransfer } from "../services/create-transfer";
//import { TransferRepository } from "../repository/transferRepository";
//import { ContaRepository } from "../repository/contaRepository";
import { ContaRepositoryOrm } from "../repository/typeormRepository/contaRpositoryOrm";
import { TransferRepositoryOrm } from "../repository/typeormRepository/transferRepositoryOrm";
//import { RequestTransfer } from "../services/request-transfer";

export class TransferController{
    
        async createTransfer(req:any, res:any){
        try{
            console.log("TranferController")
            const transferRepository=  new TransferRepositoryOrm();
            const contaRepository = new ContaRepositoryOrm();
            const createTranfer = new CreateTransfer(transferRepository,contaRepository);
          
          //const createdTranfer=  await createTranfer.saveTransfer(req.body);
          await createTranfer.saveTransfer(req.body);
           console.log('no Controller createdTranfer::');
           //console.log("typeof::",typeof(createdTranfer));
           //console.log(JSON.stringify(createdTranfer));
            return res.status(201).send('transferencia criada')
        
        }catch(error){
            console.log("entrou catch controller..  ",error);
            console.log("typeof::",typeof(error));
            console.log(JSON.stringify(error));
            return res.status(501).json(error)
        }
                
           
           
      
        } 
   
    
}