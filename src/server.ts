import express from 'express'

import "reflect-metadata";
import ConnectionSource from "./database/dataSource"
import routes from "./router.js";

ConnectionSource.initialize()
  .then(async () => {
    console.log("iniciou o banco")

    const app = express();
    app.use(express.json());

    app.use(routes)
    app.listen(4001);

    console.log("listening on port 4001");
  })
  .catch((error) => console.log('deu erro', error));



