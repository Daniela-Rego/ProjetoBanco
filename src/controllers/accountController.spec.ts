import { AccountController } from "./accountController";
import { ContaRepositoryOrm } from "../repository/typeormRepository/contaRpositoryOrm";
import { ContaRepositoryInMemory } from "../repository/in-memory/inMemoryContaRepository";
import { CreateConta } from "../services/create-conta";
describe('Testando o AccountController', () => {
    let accountController: AccountController;
    let contaRepositoryInMemory: ContaRepositoryInMemory;
    let createConta: CreateConta;
    beforeEach( async ()=>{
        createConta = new CreateConta(contaRepositoryInMemory);
        accountController = new AccountController();
    })
       
    
    it('AccountController esta definido', () => {
        expect(accountController).toBeDefined();
    })
})