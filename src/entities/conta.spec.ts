import { Conta } from './conta';
describe('teste conta', () => {
  it('criar uma conta', () => {
    const novaConta = {
      cliente: 'Daniela',
      idade: 20,
      numero_conta: 1,
      saldo: 1000,
    };
    const contaBanco = new Conta(novaConta);
    expect(contaBanco).toBeInstanceOf(Conta);
    expect(contaBanco.cliente).toBe('Daniela');
  });

  it('Cliente deve ter idade menor que 18 anos', () => {
    const menorIdade = {
      cliente: 'Daniela',
      idade: 10,
      numero_conta: 1,
      saldo: 1000,
    };
    //o toThrow valida se a função deu erro por isso nao consegue ver a variavel instanciada
    expect(() => {
      new Conta(menorIdade);
    }).toThrow(Error);
  });

  it('valida se o numero da conta não é zero', () => {
    const contaOk = {
      cliente: 'Daniela',
      idade: 18,
      numero_conta: 0,
      saldo: 1000,
    };

    expect(() => {
      return new Conta(contaOk);
    }).toThrow();
  });

  /* it("se o numero da conta for zero derá um erro",()=>{
        const contaOk ={
            cliente: "Daniela",
            idade:18,
            numero_conta:0
        }
        const contaBanco = new Conta(contaOk);
      
        expect(()=>{contaBanco.verificaConta(contaOk.numero_conta)}).toThrow();

      
    });*/
});
