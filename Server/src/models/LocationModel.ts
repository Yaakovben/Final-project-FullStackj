import mongoose, { Schema, Types } from "mongoose";

export  interface ILocation extends Document {
    city:string,
    casualties:number,
    lat:number,
    long:number,
    events:[{organization:string,amountEvents:number}]
    listEvents: Types.ObjectId[] 
}

const locatinSchema = new Schema<ILocation>({
    city:{type:String},
    casualties:{type:Number},
    lat:{type:Number},
    long:{type:Number},
    events:{type:[{organization:String,amountEvents:Number}]},
    listEvents:{type:[Schema.Types.ObjectId], ref:"MainList"}
}) 

export default mongoose.model<ILocation>("Location",locatinSchema)



