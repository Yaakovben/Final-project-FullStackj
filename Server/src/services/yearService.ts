
import YearModel from "../models/YearModel";
import getByDates from "../types/DTO/getByDatesDTO";
import yearsOranizationDTO from "../types/DTO/getYearsOrganizationDTO";







//(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
export const YearsOrganization = async (req: yearsOranizationDTO) => {
    try {   
        if (typeof req.req === "number") {
            const result = await YearModel.aggregate([
                { $match: { year: req.req } },
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

            return result;
            
        } else if (typeof req.req === "string") {
            const result = await YearModel.aggregate([
                { $unwind: "$listOrganization" },
                { $match: { "listOrganization.organization": req.req } },
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
            return result;
        } else {
            throw new Error("Invalid input type. Must be a number (year) or string (organization).");
        }
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}
