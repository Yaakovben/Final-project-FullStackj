import { Request, Response } from "express"
import getTopDTO from "../types/DTO/getTopDTO"
import { placesWithMostCasualties } from "../services/locationService"


export const getPlacesWithMostCasualties = async(req:Request<any,any,getTopDTO>,res:Response)=>{
    try {
        const topPlace = await placesWithMostCasualties(req.body)
        res.status(200).json(topPlace)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}


