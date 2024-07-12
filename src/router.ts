import {Router} from 'express'
//import express from 'express';
import  {AccountController}  from './controllers/accountController';
import { TransferController } from './controllers/tranferController';
//const app = express()
//app.use(express.json());
const routes = Router()
 const accountController =new AccountController();
 const transferController =new TransferController()
 console.log("entrei rotas ");
 routes.post('/createConta',accountController.createAccount);  

 routes.post('/createTransfer',transferController.createTransfer);



export default routes; 