import mongoose, { Schema } from "mongoose";

export interface IMainList extends Document {
    year: number;
    month: number;
    city: string;
    lat: number;
    long: number;
    attacktype: string;
    organization: string;
    casualties:number;  
}

const mainListSchema = new Schema<IMainList>({
    year:{type:Number},
    month:{type:Number},
    city: {type:String},
    lat:{type:Number},
    long:{type:Number},
    attacktype:{type:String},
    organization:{ type:String},
    casualties:{type:Number}
})

export default mongoose.model<IMainList>("MainList",mainListSchema)