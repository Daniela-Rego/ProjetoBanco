import "reflect-metadata";
import "dotenv/config";
//const dotEnv = require('dotenv').config();
import {ContasOrm} from "../database/entities/ContasOrm";
import {TransferenciasOrm} from "./entities/TransferenciasOrm";
import { DataSource} from 'typeorm';

console.log(' process.env.TYPEORM_PASSWORD::',  process.env.TYPEORM_PASSWORD);
const ConnectionSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [ContasOrm,TransferenciasOrm],
  migrations: ['dist/database/migrations/**/*.ts'],
});

export  default ConnectionSource;