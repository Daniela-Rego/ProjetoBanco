import { Conta } from '../entities/conta';
import { ContaRepositoryInMemory } from '../repository/in-memory/inMemoryContaRepository';
import { CreateConta } from './create-conta';

describe('testando o create conta', () => {
  it('testando o execute', () => {
    const bodyTest = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    const repositoryInMerory = new ContaRepositoryInMemory();
    const createConta = new CreateConta(repositoryInMerory);
    const result = createConta.execute(bodyTest);

    console.log('result test', result);
    expect(result).resolves.toBeInstanceOf(Conta);
  });

  it('testando o execute error', () => {
    const bodyTest = {
      cliente: 'Daniela',
      idade: 0,
      numero_conta: 1,
      saldo: 1000,
    };
    const repositoryInMerory = new ContaRepositoryInMemory();
    const createConta = new CreateConta(repositoryInMerory);
    const result = createConta.execute(bodyTest);
    console.log('result test', result);
    expect(result).rejects.toThrow(Error);
  });

  it('Nao pode criar pq a conta ja existe', async () => {
    //Duvida: depois de colocar um await no createConta e outro sem, funcionou, pq ?
    //o ".rejects" ja espera o resultado da função.
    const bodyTest = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    const repositoryInMerory = new ContaRepositoryInMemory();
    const createConta = new CreateConta(repositoryInMerory);
    await createConta.execute(bodyTest);

    const result = createConta.execute(bodyTest);

    console.log('result test', result);
    expect(result).rejects.toThrow(Error);
  });
});
