import { Request, Response } from "express"
import getTopDTO from "../types/DTO/getTopDTO"
import { allCities, placesWithMostCasualties, topLocationForOrgaization, topOrganizations } from "../services/locationService"
import topOranizationDTO from "../types/DTO/getTopOrganizationDTO"

//(2) אזורים עם כמות נפגעים הגבוהה ביותר, ובמקרה שישלח אזור נחזיר את כמות הנפגעים הכי גדולה 
export const getPlacesWithMostCasualties = async(req:Request<any,any,string>,res:Response) => {
    try {
        const topPlace = await placesWithMostCasualties(req.params.city)
        res.status(200).json(topPlace)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

//(4) יחזיר את 5 המובלים בתקריות באופן כללי, ואם יקבל אזור יחזיר לפי אותו אזור
export const getTopOrganizations = async(req:Request<any,any,string>,res:Response)=>{
    try {
        const oranization = await topOrganizations(req.params.city)
        res.status(200).json(oranization)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

//(6) יקבל שם של ארגון ויחזיר אפה היה לאותו ארגון התקפות עם הכי הרבה נפגעים
export const gettopLocationForOrgaization= async(req:Request<any,any,topOranizationDTO>,res:Response)=>{
    try {
        const location = await topLocationForOrgaization(req.body)
        res.status(200).json(location)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}


export const getAllCities= async(req:Request,res:Response)=>{
    try {
        const location = await allCities()
        res.status(200).json(location)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}


