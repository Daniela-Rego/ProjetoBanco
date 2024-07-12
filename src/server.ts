import 'express-async-errors'
import express from 'express'
import "reflect-metadata";
import ConnectionSource from "./database/dataSource";
import { errorMiddleware } from './middlewares/error';
import routes from "./router.js";


ConnectionSource.initialize()
  .then(async () => {
    console.log("iniciou o banco")

    const app = express();
    app.use(express.json());

    app.use(routes)
    app.use(errorMiddleware)//pode usar um middleware de erro.

    app.listen(3000);

    console.log("listening on port 3000");
  })
  .catch((error) => console.log('deu erro', error));



