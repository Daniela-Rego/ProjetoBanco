import { Transfer } from "../entities/transferencia"
import { TransferRepositoryInterface } from "../interfaces/transferRepositoryInterface";
import { ContaRepositoryInterface as ContaRepository  } from "../interfaces/contaRepositoryInterface";
import { INewTransfer } from "../interfaces/transferInterface";
import  axios  from "axios";
import { nextDay } from "date-fns";
//import { enum } from "../enums/listaEnums"

export class CreateTransfer {
    constructor(public repositoryTransfer: TransferRepositoryInterface, public repositoryConta: ContaRepository) { }
   

    async saveTransfer(createTransferRequest: INewTransfer): Promise<any> {
        try{
            console.log("entrei execute transfer", createTransferRequest);
        let createdTransfer:Transfer;   
        
            const accountSender = await this.repositoryConta.findAccount(createTransferRequest.numberAccountSender);
            const accountRecived = await this.repositoryConta.findAccount(createTransferRequest.numberAccountRecived);
    
            console.log("no transfer accountSender ", accountSender);
            console.log("no transfer accountRecived ", accountRecived);
    
           if (accountSender === undefined || accountRecived === undefined) {
                throw new Error('Não foi possível encontrar a conta v2');
            }
    
          
            if(accountSender.saldo <  createTransferRequest.valueTransfer){
                //return enum.saldo.insuficiente;
                throw new Error ("saldo insuficiente")
            }
             createdTransfer = await this.repositoryTransfer.save(createTransferRequest);
           console.log('antes de verifyIfWeekeend')
          const isWeekeend = await  this.verifyIfWeekeend(createdTransfer.created_at);
          console.log('isWeekeend',isWeekeend);
            console.log('antes de validaFeriado')
            const isHoliday = await this.verifyHoliday(createdTransfer.created_at);
            console.log('verifyHoliday',isHoliday);
            console.log('antes de calculo saldo')
                if(isWeekeend  || isHoliday ) {
                    throw new Error(
                        'Transferencia so pode ocorrer em dia Util'
                      );
                }
                console.log('antes de calculo saldo')
            accountSender.saldo = Number(accountSender.saldo) - Number(createTransferRequest.valueTransfer); 
            accountRecived.saldo =Number(accountRecived.saldo) + Number(createTransferRequest.valueTransfer);
    
            await this.repositoryConta.update(
                createdTransfer.numberAccountSender,
                accountSender.saldo
                );
    
                await this.repositoryConta.update(
                    createdTransfer.numberAccountRecived,
                    accountRecived.saldo
                    );
        
    
    
            console.log("Conta existe vamos fazer a transferencia");
            
            
            return createdTransfer;
        
        
        }catch(error : any){
            console.log("entrou no catch do create- transfer",error.message);
            console.log("typeof::",typeof(error));
            console.log(JSON.stringify(error));
           
        }
        
       
        
  
       

    }
    async verifyIfWeekeend(date: Date) :Promise<Boolean> {
        const dayOfWeek = date.getDay();
    console.log('dentro verifyIfWeekeend')
        if (dayOfWeek == 5 || dayOfWeek == 6) {
            console.log('final de semana');
         return true;
        }
        return  false;
      }

    async verifyHoliday(data:Date): Promise<Boolean|undefined> {
            //let dataTest =new Date('1-05-24')
        try{
          const listaFeriados =   await  this.chamaApi();

            let dataFormatada = this.formataData(data);
            //let dataFormatada = this.formataData(dataTest);
            console.log('dataaFormatada::',dataFormatada)
            
           
           // console.log('listaFeriadosV2::',listaFeriados);
            /*console.log("listaFeriados.data[0].date::::>>>",listaFeriados.data[0].date)
            console.log("listaFeriados.data.date::::>>>",listaFeriados.data.date);
            
            console.log('listaFeriados.data.length:::::',listaFeriados.data.length)
            
            const  feriadoEncontrado= listaFeriados.data.filter((item: any)=>item.date.includes(dataFormatada))
           console.log('feriadoEncontrado::>',feriadoEncontrado);
           
         
           if(feriadoEncontrado){
                console.log("HOJE É FERIADO !");
                return true;
            }*/
            return false;

        }catch(erro){
            console.log('Deu erro na BrasilApi:::',erro)
        }
       
    }
    
     formataData (data:Date) {

        console.log('dentro do formata data')
            const dia = data.getDate(); // Obtém o dia (1 a 31)
            const mes = data.getMonth() + 1; // Obtém o mês (0 a 11, então adicionamos 1)
            const ano = data.getFullYear(); 
            let diaFormatado;
            let mesFormatado;
            if(dia < 10){
                diaFormatado = dia.toString().padStart(2,'0');
            }
            if(mes < 10){
                 mesFormatado = mes.toString().padStart(2,'0');
             }

             let dataFormatada =`${ano}-${mesFormatado}-${diaFormatado}`;

             console.log('dataFormatada dentro do formata data',dataFormatada)
             console.log('dataFormatada ::',typeof(dataFormatada))
            return dataFormatada;
    }

   async  chamaApi(): Promise<Object>{
     const url='https://brasilapi.com.br/api/feriados/v1/2024';
          const  resultaxios   = await axios.get(url);
        
          return resultaxios ;
    
    }

}