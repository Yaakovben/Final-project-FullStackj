import MainListModel from "../models/MainListModel";
import OrganizationModel, { IOrganization } from "../models/OrganizationModel";

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

export const addEvent = async(event:IOrganization)=>{
    try {
        if(!event.name || !event.casualties || !event.lat || !event.long){
            throw new Error("all fields are required")
        }
        const newEvent = new OrganizationModel(event);
        await newEvent.save();
        return newEvent
        
    } catch (err) {
        console.log(`Error to add event ${err}`);
        
    }
}