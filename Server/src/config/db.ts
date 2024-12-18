import {connect}from 'mongoose'
import TypesAttack from '../models/TypesAttackModel';
import { seedAttack } from '../services/seedService';




export const connectToMongo = ( async()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("Connected to mongo successfully");
        const typesAttack = await TypesAttack.find({})
        if(typesAttack.length === 0){
             await seedAttack()
        }     
    } catch (err) {
        console.log("Can't connected to mongo", err)
        throw err  
    }
})






  