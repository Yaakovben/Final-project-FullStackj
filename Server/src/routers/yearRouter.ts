import { Router } from "express";
import { getattackTypeByYears, getYearsOrganization } from "../controllers/yearController";

 const router = Router()

 // (3) יקבל טווח של שנים או 5 או 10 ויחזיר את כמות התקריות שהיו מכל סוג
 router.get("/attack-by-dates",getattackTypeByYears)

 //(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
 router.get("/year-organization/:req?",getYearsOrganization)


 export default router