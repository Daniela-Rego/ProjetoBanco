import  {MigrationInterface, QueryRunner,Table } from "typeorm" ;

export class CreateConta1713740968951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name:"contas_orm",
            columns:[
                {
                   name:"id",
                   type: "uuid",
                    isPrimary:true, 
                    isNullable:false   
                },
                {
                    name:"numero_conta",
                    type: "int",
                     isPrimary:true, 
                     isNullable:false   
                 },
                {
                    name:"cliente",
                    type: "varchar",
                    isNullable:false   
                 },
                 {
                    name:"idade",
                    type: "int",
                     isNullable:false   
                 },{
                    name:"saldo",
                    type: "int",
                     isNullable:false   
                 },

        ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contas_orm")
    }

}
