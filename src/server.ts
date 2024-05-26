import "reflect-metadata";
import  ConnectionSource    from "./database/dataSource"
import app from "./router.js";

ConnectionSource.initialize()
.then(async () => {
    console.log("iniciou o banco")
  
  app.listen(4001);

  console.log("listening on port 4001");
})
.catch((error) => console.log('deu erro',error));





//const port = 4001
//app.listen(port,()=>{console.log('server rodando2')})

