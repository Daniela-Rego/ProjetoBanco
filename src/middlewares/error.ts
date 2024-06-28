import { Request,Response,NextFunction } from "express"
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (error :Error & Partial<ApiError>, req: Request, res:Response, next:NextFunction) =>{
    console.log("entrou no errorMiddleware ",error)
    const statusCode = error.statusCode ?? 500
    const messageError = error.statusCode ? error.message : 'Errooooo interno do Servidor';
    return res.status(statusCode).json({ messageError })
}