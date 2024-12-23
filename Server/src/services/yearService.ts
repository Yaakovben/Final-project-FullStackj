
import YearModel from "../models/YearModel";
import getByDates from "../types/DTO/getByDatesDTO";
import yearsOranizationDTO from "../types/DTO/getYearsOrganizationDTO";




 // (3) יקבל טווח של שנים או 5 או 10 ויחזיר את כמות התקריות שהיו מכל סוג
export const attackTypeByYears = async ({firstyear,lastyear,fiveYears,tenYears}:getByDates) => {
    const forTenYears = new Date().getFullYear() - 10;
    const forFiveYears = new Date().getFullYear() - 5;
    
    try {
        if(!firstyear && !lastyear && !fiveYears && !tenYears){
            throw new Error("[servics] Dates undfind");
        }
        if(firstyear && lastyear){
            return await YearModel.find({year:{$gte:firstyear,$lte:lastyear}})
            .select("-listOrganization")
            .select("-listEvents")
        }
        if(firstyear){
            return await YearModel.find({year:firstyear})
            .select("-listOrganization")
            .select("-listEvents");
        }
        if(fiveYears){
            return await YearModel.find({year:{$gte:forFiveYears}})
            .select("-listOrganization")
            .select("-listEvents");
        }
        if(tenYears){
            return await YearModel.find({year:{$gte:forTenYears}})
            .select("-listOrganization")
            .select("-listEvents");
        }
    } catch (error) {
        throw error;
    }
}


//(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
export const YearsOrganization = async (req:string) => {
    try {
        console.log(".lolk");
        
        const type = parseInt(req);
        if (!isNaN(type)) {
            console.log(parseInt(req));
            return await byYear(type);
        } else if (isNaN(type)) {
            console.log(parseInt(req));
            return await byOranization(req);
            
        } else {
            throw new Error("The field must be a number or year !!!");
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

//(part of 5)
const byYear = async (year: number) => {
    return await YearModel.aggregate([
        { $match: { year } },
        { $unwind: "$listOrganization" },
        { 
            $group: { 
                _id: { organization: "$listOrganization.organization", year: "$year" },
                totalEvents: { $sum: "$listOrganization.amount" }
            }
        },
        { 
            $project: {
                _id: 0,
                organization: "$_id.organization",
                year: "$_id.year",
                totalEvents: 1
            }
        },
        { $sort: { totalEvents: -1 } }
    ]);
};


//(part of 5)
const byOranization = async (organization: string) => {
    return await YearModel.aggregate([
        { $unwind: "$listOrganization" },
        { $match: { "listOrganization.organization": organization } },
        { 
            $group: { 
                _id: { year: "$year", organization: "$listOrganization.organization" },
                totalIncidents: { $sum: "$listOrganization.amount" }
            }
        },
        { 
            $project: {
                _id: 0,
                year: "$_id.year",
                organization: "$_id.organization",
                totalIncidents: 1
            }
        },
        { $sort: { year: 1 } }
    ]);
};



