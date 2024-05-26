//import { ContaRepository } from "../repository/contaRepository";
import { ContaRepositoryOrm } from "../repository/typeormRepository/contaRpositoryOrm";
import { CreateConta } from "../services/create-conta";


export class AccountController {
       
    //constructor(private contaRepository:ContaRepositoryOrm,
                //private createConta:CreateConta  ){}

    async createAccount(req: any, res: any): Promise<void> {

        console.log("entrei controllers2");
        //duvida: devo utilizar ContaRepositoryInterface ou ContaRepository ?
      const contaRepository = new  ContaRepositoryOrm();
        const createConta = new CreateConta(contaRepository);
        console.log("req.body", req.body)
        await createConta.execute(req.body)
        res.send('criação de conta ok')
    }
}
