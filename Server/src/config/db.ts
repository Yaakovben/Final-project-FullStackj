import {connect}from 'mongoose'
import TypesAttack from '../models/TypesAttackModel';
import { seedAttack, seedOrganization } from '../services/seedService';
import Organization from '../models/OrganizationModel';




export const connectToMongo = ( async()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("Connected to mongo successfully");
        const typesAttack = await TypesAttack.find({})
        if(typesAttack.length === 0){
             await seedAttack()
        }  
        const organization = await Organization.find({})  
        if(organization.length === 0){
            await seedOrganization()
        }
    } catch (err) {
        console.log("Can't connected to mongo", err)
        throw err  
    }
})






  