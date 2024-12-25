import mongoose, { Schema, Types } from "mongoose";

export  interface IYear extends Document {
    year:number,
    listAmontType:[{typeAttack:string,ampount:number}],
    listOrganization:[{organization:string,amount:number}]
    listEvents: Types.ObjectId[] 
} 

const dateSchema = new Schema<IYear>({
    year:{type:Number},
    listAmontType:{type:[{typeAttack:String,ampount:Number}]},
    listOrganization:{type:[{organization:String,amount:Number}]},
    listEvents:{type:[Schema.Types.ObjectId], ref:"MainList"}
}) 

export default mongoose.model<IYear>("Years",dateSchema)



