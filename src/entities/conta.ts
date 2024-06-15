import { v4 as uuidv4 } from 'uuid';
import { ContasOrm } from '../database/entities/ContasOrm';
export interface ParamsConta {
    id?: string; 
    cliente: string;
    idade: number;
    numero_conta: number;
    saldo: number;
    error?:string;
    
}

export class Conta {
  private props: ParamsConta;
 


  constructor(atributos: ParamsConta) {
    console.log('entrei class CONTA', atributos);
    this.verificaConta(atributos.numero_conta);
    this.verificarIdade(atributos.idade);
    this.props = atributos;
    if(atributos.id === undefined|| atributos.id === null){
      this.props.id = uuidv4();
    }
   
    
   
    console.log('this.props depois de add id::',this.props)
    
  }

  get cliente() {
    return this.props.cliente;
  }
  get idade() {
    return this.props.idade;
  }
  get numero_conta() {
    return this.props.numero_conta;
  }
  
  get id(){
    return this.props.id || '' ;
  }

  get saldo() {
    return this.props.saldo;
  }
  set saldo(value: number) {
    this.props.saldo = value;
  }
 
  set id (novoId:string){
    this.props.id = novoId;
  }

  private verificaConta(numero_conta: number) {
    if (numero_conta == 0) {
      console.log('entrei no erro');
      throw new Error('Numero da conta nao pode ser zero');
    }
  }
  private verificarIdade(idade: number) {
    if (idade < 18) {
      throw new Error('Não pode ser menor que 18 anos');
    }
  }
 
}
