import TypesAttackModel from "../models/TypesAttackModel";


export const RatingTypesAttacks = async function getTypesAttackByCasualties() {
    try {
        const attacks = await TypesAttackModel.find()
            .sort({ casualties: -1 }) 
            .select('-listEvents') 
            .exec(); 
        return attacks;
    } catch (error) {
        console.error("Error fetching types of attacks:", error);
        throw error;
    }
};


