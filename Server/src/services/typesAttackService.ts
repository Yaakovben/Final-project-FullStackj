import TypesAttackModel from "../models/TypesAttackModel";

//(1) סוגי תקיפות מדורגים לפי מספר נפגעים
export const RatingTypesAttacks = async () => {
    try {
        const attacks = await TypesAttackModel.find()
            .sort({ casualties: -1 }) 
            .select('-listEvents') 
        return attacks;
    } catch (err) {
        console.error("[service] Error types of attacks:", err);
        throw err;   
    }
};


