import { CreateTransfer } from "../services/create-transfer";
//import { TransferRepository } from "../repository/transferRepository";
//import { ContaRepository } from "../repository/contaRepository";
import { ContaRepositoryOrm } from "../repository/typeormRepository/contaRpositoryOrm";
import { TransferRepositoryOrm } from "../repository/typeormRepository/transferRepositoryOrm";
import { NextFunction } from "express";
//import { RequestTransfer } from "../services/request-transfer";

export class TransferController{
    
        async createTransfer(req:any, res:any, next:NextFunction){
        try{
            console.log("TranferController")
            const transferRepository=  new TransferRepositoryOrm();
            const contaRepository = new ContaRepositoryOrm();
            const createTranfer = new CreateTransfer(transferRepository,contaRepository);
          
          //const createdTranfer=  await createTranfer.saveTransfer(req.body);
        const createdTranfer=  await createTranfer.saveTransfer(req.body);
           console.log('no Controller createdTranfer::',createdTranfer);
           console.log("typeof::",typeof(createdTranfer));
           console.log(JSON.stringify(createdTranfer));
            return res.status(201).send('transferencia criada')
        
        }catch(error:any)//se ficar sem o tipo any não consigo pegar a message do erro
        {
           // console.log("entrou catch controller..  ",error);
            console.log("entrou catch controller..  ",error);
            console.log("entrou catch controller statusCode..  ",error.statusCode);
            next(error); 
           // return res.status(error.statusCode).json({  error: error.message });
            //return res.status(500).send('Ocorreu um erro: ' + error.message)//posso usar desse jeito tbm
            
        }
                
           
           
      
        } 
   
    
}