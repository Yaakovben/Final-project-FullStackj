import { Router } from "express";
import { getattackTypeByYears, getYearsOrganization } from "../controllers/yearController";

 const router = Router()

 router.get("/attack-by-dates",getattackTypeByYears)
 
 //(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
 router.get("/year-oranization",getYearsOrganization)


 export default router