import { Request, Response } from "express"
import { YearsOrganization } from "../services/yearService"
import yearsOranizationDTO from "../types/DTO/getYearsOrganizationDTO"

//(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
export const getYearsOrganization = async(req:Request<any,any,yearsOranizationDTO>,res:Response)=>{
    try {
        const yearsOranization = await YearsOrganization(req.body)
        res.status(200).json(yearsOranization)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}