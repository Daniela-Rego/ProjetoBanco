import express from 'express';
import  {AccountController}  from './controllers/accountController';
import { TransferController } from './controllers/tranferController';
const app = express()
app.use(express.json());
 const accountController =new AccountController();
 const transferController =new TransferController()
 console.log("entrei rotas");
app.post('/createConta',accountController.createAccount);  

app.post('/createTransfer',transferController.createTransfer);



export default app; 