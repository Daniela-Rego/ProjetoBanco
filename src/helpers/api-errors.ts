export class ApiError extends Error {

    public readonly statusCode: number;
    
    constructor(message: string,statusCode: number){
        super(message)
        this.statusCode = statusCode ;
        console.log("entrou no apiERRO");
    }
    
}
//Herdei de ApiError para poder usar o statusCode, poderia sim, criar um nessa nova classe de erro.
export class NotFoundError extends ApiError{
    constructor(message: string){
        super(message, 404 )
    }
}