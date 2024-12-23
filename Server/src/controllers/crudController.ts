import { Request, Response } from "express"
import { getAll } from "../services/crudService"

export const getAllEvents = async(req:Request,res:Response) => {
    try {
        const all = await getAll()
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}