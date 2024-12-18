import mongoose, { Schema, Types } from "mongoose";

export  interface ITypesAttack extends Document {
    name:string,
    casualties:number
    listEvents: Types.ObjectId[] 
}

const typesAttackSchema = new Schema<ITypesAttack>({
    name:{type:String},
    casualties:{type:Number},
    listEvents:{type:[Schema.Types.ObjectId], ref:"MainList"}
}) 

export default mongoose.model<ITypesAttack>("TypesAttack",typesAttackSchema)



