import { Router } from "express";
import { getYearsOrganization } from "../controllers/yearController";

 const router = Router()

 //(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
 router.get("/year-oranization",getYearsOrganization)


 export default router