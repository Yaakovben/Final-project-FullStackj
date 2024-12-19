import {connect}from 'mongoose'
import TypesAttack from '../models/TypesAttackModel';
import { seedAttack, seedLocation, seedMain, seedOrganization, seedYear } from '../services/seedService';
import Organization from '../models/OrganizationModel';
import Location from '../models/LocationModel';
import MainList from '../models/MainListModel';
import Year from '../models/YearModel';




export const connectToMongo = ( async()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("Connected to mongo successfully");
        const mainList = await MainList.find({})
        if(mainList.length === 0){
            await seedMain()
        }
        const typesAttack = await TypesAttack.find({})
        if(typesAttack.length === 0){
             await seedAttack()
        }  
        const organization = await Organization.find({})  
        if(organization.length === 0){
            await seedOrganization()
        }
        const location = await Location.find({}) 
        if(location.length === 0){
            await seedLocation()
        }
        const year = await Year.find({})
        if(year.length === 0){
            await seedYear()
        }
    } catch (err) {
        console.log("Can't connected to mongo", err)
        throw err  
    }
})






  