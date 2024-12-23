import MainListModel from "../models/MainListModel";

export const getAll = async()=>{
    try {
        const all = await MainListModel.find({});
        return all
    } catch (err) {
        console.log(`cant' get all: ${err}`);    
    }
}