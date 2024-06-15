import { Conta } from "../../entities/conta";
import { ContaRepositoryInterface } from "../../interfaces/contaRepositoryInterface";
import { ContasOrm } from "../../database/entities/ContasOrm";
import   ConnectionSource   from "../../database/dataSource"

export class ContaRepositoryOrm implements ContaRepositoryInterface {
    private repo = ConnectionSource.getRepository(ContasOrm);

    async save (conta: Conta): Promise<void>{
        console.log("entrei no save ContaRepositoryOrm",conta)
         try{
            const resultTypeOrm = await this.repo.save(conta)
            console.log('resultTypeOrm',resultTypeOrm)
       } catch (erro) {
        console.log("entrei no catch", erro)
      }
        
    }

    async findAccount(numeroConta: number): Promise<Conta| undefined>{
        
   
            const queryfind= `select * from contas_orm where numero_conta =$1;`
       const resultFind =await this.repo.query(queryfind,[numeroConta]); 
       //const resultFind = await this.repo.findBy({numero_conta: numeroConta})
        console.log('resultFind findAccountv1:::',resultFind)
       
        // quando usamos findBy se tirar o new Conta da erro pq o findBy retorna um objeto
        if(resultFind.length===0){
           // const contaEncontrada = new Conta(resultFind[0]);
            console.log('resultFind findAccountv2:::')
            return undefined;
            
            
        }
        
        console.log('resultFind findAccountv3:::',resultFind)
        return resultFind[0];

        

       
    }

     async update(accountId: number, novoSaldo: number): Promise<void>{
        console.log("update conta")
        const queryUpdate = `update  contas_orm set saldo = $2 where numero_conta= $1;`
        console.log('query'+queryUpdate +' values: '+novoSaldo +' ' + accountId) ;
        const result = await this.repo.query(queryUpdate, [accountId, novoSaldo]);
        console.log('result update',result)

    }
   
    

}