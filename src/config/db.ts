const  { Pool } = require('pg');
const dotEnv = require ('dotenv').config();
console.log('process.env.PGPASSWORD::', process.env.PGPASSWORD);
export let pool:any;
try{
    pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD
     });
    
}catch(erro){
    console.log("catch conexão",erro);
}


 