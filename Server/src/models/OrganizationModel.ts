import mongoose, { Schema, Types } from "mongoose";

export  interface IOrganization extends Document {
    name:string,
    events:[{locatin:string,casualties:number}]
    kills:number
    listEvents: Types.ObjectId[] 
}

const organizationSchema = new Schema<IOrganization>({
    name:{type:String},
    events:{type:[{locatin:String,casualties:Number}]},
    kills:{type:Number},
    listEvents:{type:[Schema.Types.ObjectId], ref:"MainList"}
}) 

export default mongoose.model<IOrganization>("Organization",organizationSchema)



