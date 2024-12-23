import MainListModel from "../models/MainListModel";
import OrganizationModel from "../models/OrganizationModel";

export const getAll = async()=>{
    try {
        const all = await OrganizationModel.find({})
        .limit(100)
        .select('-listEvents');
        
        return all
    } catch (err) {
        console.log(`cant' get all: ${err}`);    
    }
}