import { ITransfer } from "../interfaces/transferInterface";
import { Transfer } from "./transferencia"

describe("testando a entitie Tranferencia",()=>{

 it("transfer foi declarada",()=>{
    
    expect(Transfer).toBeDefined();
 })   
    it("Criar uma transferencia ",()=>{
        const request = {
            numberAccountSender:1,
            numberAccountRecived:2,
            valueTransfer:15,
            created_at: new Date(),
            id: "12s"
        }
        const response = new Transfer(request);
        console.log("testeee",response);
        expect(response).toBeInstanceOf(Transfer)
    });
    it("Nao é possivel criar uma transferecia quando o numberContaSender é 0 ",()=>{
        const request:ITransfer = {
            numberAccountSender:0,
            numberAccountRecived:2,
            valueTransfer:15,
            created_at: new Date(),
            id: "12s"
        }
       
       expect(()=>{new Transfer(request)}).toThrow(Error);
    });
   /* it("Buscar todas as transferencias de uma conta",()=>{
        const request = {
            numberAccount: 12342
        }
       expect(()=>{new Transfer(request)}).toThrow(Error);
    });*/
}) 


