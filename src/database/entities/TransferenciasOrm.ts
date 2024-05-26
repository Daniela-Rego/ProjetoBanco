import "reflect-metadata";
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { ContasOrm } from "./ContasOrm";
import { TransferRepositoryInterface } from "../../interfaces/transferRepositoryInterface";

@Entity("transferencia_orm")
export class TransferenciasOrm{

      constructor(id: string, numberaccountsender: number, numberaccountrecived: number, valuetransfer: number, created_at: Date) {
        this.id = id;
        this.numberaccountsender = numberaccountsender;
        this.numberaccountrecived = numberaccountrecived;
        this.valuetransfer = valuetransfer;
        this.created_at = created_at;
    }

    @PrimaryColumn()
    id :string;

    @Column()
    numberaccountsender: number;
    @OneToOne(()=>ContasOrm)
    @JoinColumn({name:"numero_conta"})

    @Column()
    numberaccountrecived: number;
    @OneToOne(()=>ContasOrm)
    @JoinColumn({name:"numero_conta"})

    @Column()
    valuetransfer: number;

    @Column()
    created_at: Date;

   
}