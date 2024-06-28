import { Conta } from "../entities/conta"
import { ApiError } from "../helpers/api-errors";
import { CreatContaRequest } from "../interfaces/contaInterface";
import {  ContaRepositoryInterface } from "../interfaces/contaRepositoryInterface";
import { v4 as uuidv4 } from 'uuid';

type CreatContaResponse = Conta;
export class CreateConta {
    constructor( private repository: ContaRepositoryInterface){}
   

    async execute(contaRequest:CreatContaRequest): Promise<CreatContaResponse>{
        console.log('contaRequest_body',contaRequest);
        console.log('como fica o contaRequest?',contaRequest)
        const createConta = new Conta(contaRequest);
        console.log('createConta',createConta);
       
       
        const contaExiste = await this.repository.findAccount(createConta.numero_conta);
      console.log('contaExiste no execute conta',contaExiste);
        if( contaExiste){
            throw new ApiError('Numero de conta ja existe',404);
        }
       
        const resultRepository= await this.repository.save(createConta);
        console.log('resultRepository', resultRepository);
        console.log('contaExiste',contaExiste)
        return createConta;

        

    }

   

}