import { Request, Response, text } from "express";

class IndexControllers{
    public index (req: Request, res: Response){
        res.json({text:'hello'});
        console.log('Iniciar ruta');
    }
}

export const indexControllers = new IndexControllers();