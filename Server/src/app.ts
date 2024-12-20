import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToMongo } from "./config/db";
import { seedAttack, seedMain, seedOrganization } from "./services/seedService";
import typesAttackRoter from './routers/typesAttackRouter'
import locationRouter from './routers/locationRouter'
import yearRouter from './routers/yearRouter'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express() 
app.use(express.json())    
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));            

connectToMongo() 

app.use("/api/typesAttack",typesAttackRoter)
app.use("/api/location",locationRouter)
app.use("/api/year",yearRouter)


app.listen(PORT, ()=>{ 
    console.log(`Server is runnig, visit "http://localhost:${PORT}"`);     
})          
