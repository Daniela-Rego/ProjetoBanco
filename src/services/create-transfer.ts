import { Transfer } from "../entities/transferencia"
import { TransferRepositoryInterface } from "../interfaces/transferRepositoryInterface";
import { ContaRepositoryInterface as ContaRepository } from "../interfaces/contaRepositoryInterface";
import { INewTransfer } from "../interfaces/transferInterface";
import axios from "axios";
import { ApiError, NotFoundError } from "../helpers/api-errors";
import { NextFunction } from "express";
//import { enum } from "../enums/listaEnums"

export class CreateTransfer {
    constructor(public repositoryTransfer: TransferRepositoryInterface, public repositoryConta: ContaRepository) { }


    async saveTransfer(createTransferRequest: INewTransfer): Promise<any> {
          try{
                console.log("entrei execute transfer", createTransferRequest);
                let createdTransfer: Transfer;
    
                const accountSender = await this.repositoryConta.findAccount(createTransferRequest.numberAccountSender);
                const accountRecived = await this.repositoryConta.findAccount(createTransferRequest.numberAccountRecived);
    
                console.log("no transfer accountSender ", accountSender);
                console.log("no transfer accountRecived ", accountRecived);
    
                if (accountSender === undefined || accountRecived === undefined) {
                    throw new NotFoundError('Não foi possível encontrar a conta ');
                }
    
    
                if (accountSender.saldo < createTransferRequest.valueTransfer) {
                    console.log("entrei no erro")
                    throw new ApiError("saldo insuficiente", 400)
                }
                createdTransfer = await this.repositoryTransfer.save(createTransferRequest);
                console.log('antes de verifyIfWeekeend')
                const isWeekeend = await this.verifyIfWeekeend(createdTransfer.created_at);
                console.log('isWeekeend', isWeekeend);
                console.log('antes de validaFeriado')
                const isHoliday = await this.verifyHoliday(createdTransfer.created_at);
                console.log('verifyHoliday', isHoliday);
                console.log('antes de calculo saldo')
                if (isWeekeend || isHoliday) {
                    throw new ApiError(
                        'Transferencia so pode ocorrer em dia Util', 400
                    );
                }
                console.log('antes de calculo saldo')
                accountSender.saldo = Number(accountSender.saldo) - Number(createTransferRequest.valueTransfer);
                accountRecived.saldo = Number(accountRecived.saldo) + Number(createTransferRequest.valueTransfer);
    
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
            }catch(error: any){
                console.log("entrei no catch do create-transfer",error);
                throw error;
                
            }

           




    }
    async verifyIfWeekeend(date: Date): Promise<Boolean> {
        const dayOfWeek = date.getDay();
        console.log('dentro verifyIfWeekeend',dayOfWeek)
        if (dayOfWeek == 0 || dayOfWeek == 6) {
            console.log('final de semana');
            //return true;
        }
        return false;
    }

    async verifyHoliday(data: Date): Promise<Boolean | undefined> {
        let dataTest =new Date('2024-5-1').toISOString().split('T')[0];
        console.log('dataTest::',dataTest)
        try {
           // const listaFeriados = await this.chamaApi(dataTest);
           const url = 'https://brasilapi.com.br/api/feriados/v1/2024';
           const listaFeriados = await axios.get(url);

            let dataFormatada = this.formataData(data);
            //let dataFormatada = this.formataData(dataTest);
            console.log('dataaFormatada::', dataFormatada)


             console.log('listaFeriadosV2::',listaFeriados);
            console.log("listaFeriados.data[0].date::::>>>",listaFeriados.data[0].date)
           
            
            console.log('listaFeriados.data.length:::::',listaFeriados.data.length)
            
            //const  feriadoEncontrado= listaFeriados.data.filter((item: any)=>item.date === dataTest)
            const  feriadoEncontrado= listaFeriados.data.filter((item: any)=>item.date.includes(dataFormatada))
           console.log('feriadoEncontrado::>',feriadoEncontrado);
           
         
           if(feriadoEncontrado.length){
                console.log("HOJE É FERIADO !");
                return true;
            }
            return false;

        } catch (erro) {
            console.log('Deu erro na BrasilApi:::', erro)
        }

    }

    formataData(data: Date) {

        console.log('dentro do formata data')
        let dia = data.getDate(); // Obtém o dia (1 a 31)
        let mes = data.getMonth() + 1; // Obtém o mês (0 a 11, então adicionamos 1)
        const ano = data.getFullYear();
        let diaFormatado;
        let mesFormatado;
        let dataFormatada;

        console.log('diaaaaaaaaa:',dia)

        if (dia < 10) {
            diaFormatado = dia.toString().padStart(2, '0');
            dia = Number(diaFormatado)
            
        }
        if (mes < 10) {
            mesFormatado = mes.toString().padStart(2, '0');
            mes = Number(mesFormatado)
            
        }

        dataFormatada = `${ano}-${mes}-${dia}`;

        console.log('dataFormatada dentro do formata data', dataFormatada)
        console.log('dataFormatada ::', typeof (dataFormatada))
        return dataFormatada;
    }

    async chamaApi(data: Date): Promise<Object> {
       
        const url = 'https://brasilapi.com.br/api/feriados/v1/2024';
        const resultaxios = await axios.get(url);
        console.log('listaFeriadosV4::',resultaxios.data);
       let feriados= resultaxios.data
        const feriadoHoje = feriados.find((fer:any) => fer.date === data);
        console.log('feriadoHoje::',feriadoHoje)
        return resultaxios.data;

    }

}