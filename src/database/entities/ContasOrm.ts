import "reflect-metadata";
import { Entity, Column, PrimaryColumn } from "typeorm";


@Entity("contas_orm")
export class ContasOrm{

    @PrimaryColumn()
    id: string;  
    @Column()
     numero_conta: number;
    @Column()
    cliente: string;

    @Column()
    idade: number;

    @Column()
    saldo: number;

    constructor(id: string ,numero_conta: number, cliente: string, idade: number, saldo: number) {
        this.id = id;
        this.numero_conta = numero_conta;
        this.cliente = cliente;
        this.idade = idade;
        this.saldo = saldo;
    }
}