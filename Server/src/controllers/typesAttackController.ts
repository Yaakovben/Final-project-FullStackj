import { Request, Response } from "express"
import { RatingTypesAttacks } from "../services/typesAttackService"

export const getRatingTypesAttacks = async(req:Request,res:Response)=>{
    try {
        const ratingTypesAttacks = await RatingTypesAttacks()
        res.status(200).json(ratingTypesAttacks)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}