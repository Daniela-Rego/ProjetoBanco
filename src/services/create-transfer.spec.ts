import { Transfer } from '../entities/transferencia';
import { InMemoryTransferRepository } from '../repository/in-memory/inMemoryTransferRepository';
import { CreateTransfer } from './create-transfer';
import { ContaRepositoryInMemory } from '../repository/in-memory/inMemoryContaRepository';
import { CreateConta } from './create-conta';

//jest.mock('./create-transfer');
jest.mock('axios');
describe('testando a criação de uma Transferência', () => {
  let createTransfer: CreateTransfer;
  let transferRepositoryInMory: InMemoryTransferRepository;
  let contaRepositoryInMemory: ContaRepositoryInMemory;
  

  beforeEach(async () => {
    transferRepositoryInMory = new InMemoryTransferRepository();
    contaRepositoryInMemory = new ContaRepositoryInMemory();
   
    createTransfer = new CreateTransfer(
      transferRepositoryInMory,
      contaRepositoryInMemory
    );
    
    const createContaBodyTest = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    //Duvida: aqui deveria ser "createContaBodyTest2: Conta" ?
    const createContaBodyTest2 = {
      cliente: 'Dani',
      idade: 21,
      numero_conta: 2,
      saldo: 1000,
    };
    const createContaBodyTest3 = {
      cliente: 'Dan',
      idade: 31,
      numero_conta: 3,
      saldo: 1000,
    };
    const createConta = new CreateConta(contaRepositoryInMemory);
    await createConta.execute(createContaBodyTest);
    await createConta.execute(createContaBodyTest2);
    await createConta.execute(createContaBodyTest3);
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
  });

  it('executa uma transferencia com sucesso', async () => {
    const newRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };

    expect(() => {
      createTransfer.saveTransfer(newRequestTransfer);
    }).not.toThrow();
  });
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
    const listAllTransfers: Transfer[] = await transferRepositoryInMory.listAll();
    expect(Array.isArray(listAllTransfers)).toBe(true);
  });

  it('verificar se é final de semana',async()=>{
   
    console.log('DenTRO DO TESTE DENmockCreateTransfer',createTransfer)
    const result = await createTransfer.verifyIfWeekeend(new Date('2024-04-08'));
    console.log('Resulte teste',result);

    expect(result).toBeFalsy();
  })
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
  it('verifica se é feriado', async()=>{
    const bodyRequestTransfer = {
      numberAccountSender: 1,
      numberAccountRecived: 2,
      valueTransfer: 15,
    };
    jest.spyOn(createTransfer, 'chamaApi').mockResolvedValue(false);
    await  createTransfer.saveTransfer(bodyRequestTransfer);
    expect(await createTransfer.verifyHoliday).toHaveBeenCalled();
  })
});
