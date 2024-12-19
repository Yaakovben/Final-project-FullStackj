import LocationModel from "../models/LocationModel";
import OrganizationModel from "../models/OrganizationModel";
import getTopDTO from "../types/DTO/getTopDTO";
import topOranizationDTO from "../types/DTO/getTopOrganizationDTO";


//(2) אזורים עם כמות נפגעים הגבוהה ביותר, ובמקרה שישלח אזור נחזיר את כמות הנפגעים הכי גדולה 
export const placesWithMostCasualties = async(city:getTopDTO) => {
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
        console.log("[service] Error get top loction",err);
        throw err;    
    }
}

//(4) יחזיר את 5 המובלים בתקריות באופן כללי, ואם יקבל אזור יחזיר לפי אותו אזור
export const topOrganizations = async (city: getTopDTO)=> {
    try {
        if (!city.city) {
            return await byOrganization();
        }
        return await byCity(city.city);
    } catch (error) {
        console.log("[service] Error in topOrganizations:", error);
        throw error;
    }
};


// (part of 4) 
const byOrganization = async () => {
    try {
        const organizations = await OrganizationModel.aggregate([
            {
                $addFields: {
                    eventsCount: { $size: "$listEvents" }
                }
            },
            {
                $sort: { eventsCount: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    name: 1,
                    eventsCount: 1
                }
            }
        ]);
        return organizations;
    } catch (error) {
        console.log("[service] Error fetching top organizations:", error);
        throw error;
    }
};


// (part of 4) 
const byCity = async (city: string) => {
    try {
        const location = await LocationModel.aggregate([
            { $match: { city: city } },

            { $unwind: "$events" },
            {
                $group: {
                    _id: "$events.organization", 
                    totalEvents: { $sum: "$events.amountEvents" } 
                }
            },
            {
                $sort: { totalEvents: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    organization: "$_id",
                    totalEvents: 1
                }
            }
        ]);
        if (location.length === 0) {
            return ["location not found"];
        }
        return location;
    } catch (error) {
        console.log("[service] Error fetching top location:", error);
        throw error;
    }
};


//(6) יקבל שם של ארגון ויחזיר אפה היה לאותו ארגון התקפות עם הכי הרבה נפגעים
export const topLocationForOrgaization = async(organization:topOranizationDTO) => {
    try {
        const locations = await LocationModel.find({"events.organization": organization.organization})
        .sort({ casualties: -1 }) 
        .select('-listEvents')
        .select('-events') 
        .limit(10)
        if(locations.length !== 0){
        return locations}
        throw new Error("Location not found")
    } catch (error) {
        console.log(" [service] Error top oranization location", error);
        throw error
    }
}




