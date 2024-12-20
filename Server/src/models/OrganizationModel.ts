import mongoose, { Schema, Types } from "mongoose";

export  interface IOrganization extends Document {
    name:string,
    casualties:number
    lat: number;
    long: number;
    listEvents: Types.ObjectId[] 
}

const organizationSchema = new Schema<IOrganization>({
    name:{type:String},
    casualties:{type:Number},
    lat:{type:Number},
    long:{type:Number},
    listEvents:{type:[Schema.Types.ObjectId], ref:"MainList"}
}) 

export default mongoose.model<IOrganization>("Organization",organizationSchema)



