import { Request, Response } from "express"
import { addEvent, getAll } from "../services/crudService"
import { IOrganization } from "../models/OrganizationModel"

export const getAllEvents = async(req:Request,res:Response) => {
    try {
        const all = await getAll()
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}
export const addNewEvent = async(req:Request<any,any,IOrganization>,res:Response) => {
    try {
        const newEvent = await addEvent(req.body)
        console.log(newEvent);
        
        res.status(200).json(newEvent)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}