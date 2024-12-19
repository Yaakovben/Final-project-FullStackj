import { Request, Response } from "express"
import { attackTypeByYears, YearsOrganization } from "../services/yearService"
import yearsOranizationDTO from "../types/DTO/getYearsOrganizationDTO"
import getByDates from "../types/DTO/getByDatesDTO"

//(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
export const getYearsOrganization = async(req:Request<any,any,yearsOranizationDTO>,res:Response)=>{
    try {
        const yearsOranization = await YearsOrganization(req.body)
        res.status(200).json(yearsOranization)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}
export const getattackTypeByYears = async(req:Request<any,any,getByDates>,res:Response)=>{
    try {
        const listYears = await attackTypeByYears(req.body)
        res.status(200).json(listYears)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}