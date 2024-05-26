import { Conta } from "../../entities/conta";
import { ContaRepositoryInterface } from "../../interfaces/contaRepositoryInterface";

export class ContaRepositoryInMemory implements ContaRepositoryInterface{
    private contas: Conta[] = [] 
    
     async save(conta: Conta): Promise<void> {
       const insertArray = this.contas.push(conta);
       console.log('insertArray repository: ',insertArray);
       console.log('depois do insert: ',this.contas);
     }
     async findAccount(numeroConta:Number): Promise<Conta| undefined>{
        console.log('entrou em procurar conta',numeroConta);
        console.log("this.contas procurar conta",this.contas)
       
        let contaEncontrada = this.contas.find((item)=> {
         console.log("nConta no find de contas",item);
         return item.numero_conta == numeroConta
        });
        
      console.log('contaEncontrada no procurar contas: ',contaEncontrada);

        return contaEncontrada;
     }
     async update(accountId: number, novoSaldo: number): Promise<void> {
      // Change Saldo
      let changedAcount;
  
      // Update on array
      this.contas = this.contas.map((item) => {
        if (item.numero_conta === accountId) {
          item.saldo = novoSaldo;
          changedAcount = item;
          return item;
        }
  
        return item;
      });
  
      if (!changedAcount) {
        throw new Error('Conta não encontrada');
      }
  
      // Return account
      return changedAcount;
    }
}

