import { Router } from "express";
import { getattackTypeByYears, getYearsOrganization } from "../controllers/yearController";

 const router = Router()

 //(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
 router.get("/year-oranization",getYearsOrganization)
 router.get("/attack-by-dates",getattackTypeByYears)


 export default router