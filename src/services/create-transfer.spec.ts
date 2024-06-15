import { Transfer } from '../entities/transferencia';
import { InMemoryTransferRepository } from '../repository/in-memory/inMemoryTransferRepository';
import { CreateTransfer } from './create-transfer';
import { ContaRepositoryInMemory } from '../repository/in-memory/inMemoryContaRepository';
import { CreateConta } from './create-conta';
//import {mockBrasilApi} from './__TESTES__/mockBrasilApi';

//jest.mock('./create-transfer');
jest.mock('axios');
describe('testando a criação de uma Transferência', () => {
  let createTransfer: CreateTransfer;
  let transferRepositoryInMoryMock: InMemoryTransferRepository;
  let contaRepositoryInMemoryMock: ContaRepositoryInMemory;
  

  beforeEach(async () => {
    transferRepositoryInMoryMock = new InMemoryTransferRepository();
    contaRepositoryInMemoryMock = new ContaRepositoryInMemory();
   
    createTransfer = new CreateTransfer(
      transferRepositoryInMoryMock,
      contaRepositoryInMemoryMock
    );
    
    const createContaBodyTestMock = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    //Duvida: aqui deveria ser "createContaBodyTest2: Conta" ?
    const createContaBodyTest2Mock = {
      cliente: 'Dani',
      idade: 21,
      numero_conta: 2,
      saldo: 1000,
    };
    const createContaBodyTest3Mock = {
      cliente: 'Dan',
      idade: 31,
      numero_conta: 3,
      saldo: 1000,
    };
    const createConta = new CreateConta(contaRepositoryInMemoryMock);
    await createConta.execute(createContaBodyTestMock);
    await createConta.execute(createContaBodyTest2Mock);
    await createConta.execute(createContaBodyTest3Mock);
  });

  it('Salvando uma transferência no banco', async () => {
    const request = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    console.log('createTransfer teste:', createTransfer);
    const results = await createTransfer.saveTransfer(request);
    console.log('results teste', results);
    expect(results).toBeInstanceOf(Transfer);
    expect(results).toHaveProperty('id');
    expect(() => {
      createTransfer.saveTransfer(request);
    }).not.toThrow();
    expect(results.numberAccountSender).toBe(1);
    expect(results.numberAccountRecived).toBe(2);
  });
  //tentativa de um TDD
  it('lista todas as transferências',async()=>{
    const newRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 10,
    };
    const newRequestTransfer2 = {
      numberAccountSender: 2,
      numberAccountRecived: 3,
      valueTransfer: 50,
    };
    await createTransfer.saveTransfer(newRequestTransfer);
    await createTransfer.saveTransfer(newRequestTransfer2);
    const listAllTransfers: Transfer[] = await transferRepositoryInMoryMock.listAll();
    expect(Array.isArray(listAllTransfers)).toBe(true);
  });

  it('verificar se é final de semana',async()=>{
  //esperamos que a data seja dia util:
    const payload = new Date('2024-04-08')
   
    console.log('DenTRO DO TESTE DENmockCreateTransfer',createTransfer)
    const result = await createTransfer.verifyIfWeekeend(payload);
    console.log('Resulte teste',result);

    expect(result).toBeFalsy();
  })
    //fazer um teste parecido mas para o repository inMemory
  it('verifica se a função verifyIfWeekeend foi chamada',async()=>{
    const bodyRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };
     jest.spyOn(createTransfer, 'verifyIfWeekeend').mockResolvedValue(false);
     await  createTransfer.saveTransfer(bodyRequestTransfer);
     expect(await createTransfer.verifyIfWeekeend).toHaveBeenCalled();
  })
  //validar se for feriado então deve dar erro
  it('verifica se é feriado', async()=>{
    const bodyRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };
    //jest.spyOn(createTransfer, 'chamaApi').mockResolvedValue(mockBrasilApi); está com erro
    const toThrows = await  createTransfer.saveTransfer(bodyRequestTransfer);
    expect(await createTransfer.verifyHoliday).toHaveBeenCalled();
    expect(toThrows).toThrow('Transferência só pode ocorrer em dia Util')
    //expect(result).rejects.toThrow(Error);
  })


});
