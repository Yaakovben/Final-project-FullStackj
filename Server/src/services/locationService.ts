import LocationModel from "../models/LocationModel";
import getTopDTO from "../types/DTO/getTopDTO";

export const placesWithMostCasualties = async(city:getTopDTO)=>{
    try {
        if(!city.city){
            const location =await LocationModel.find({})
            .sort({ casualties: -1 }) 
            .select('-listEvents')
            .select('-events') 
            .limit(10)
            return location
        }else{
            const location =await LocationModel.findOne({city:city.city})
            .sort({ casualties: -1 }) 
            .select('-listEvents') 
            .select('-events') 
            .limit(10)
            return location  
        }
    } catch (err) {
        console.error("[service]Error get top loction", err);
        throw err;    
    }
}



