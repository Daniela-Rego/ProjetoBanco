import { Conta } from "../entities/conta"

export interface ContaRepositoryInterface {
 
  save(conta: Conta): Promise<void>;
  findAccount(numeroConta: Number): Promise<Conta | undefined>;
  update(account: number, novoSaldo: number): Promise<void>;

}
