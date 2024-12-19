import TypesAttackModel from "../models/TypesAttackModel";


export const RatingTypesAttacks = async function getTypesAttackByCasualties() {
    try {
        const attacks = await TypesAttackModel.find()
            .sort({ casualties: -1 }) 
            .select('-listEvents') 
        return attacks;
    } catch (err) {
        console.error("[service]Error fetching types of attacks:", err);
        throw err;   
    }
};


