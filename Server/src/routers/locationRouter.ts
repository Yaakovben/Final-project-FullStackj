import { Router } from "express";
import { getPlacesWithMostCasualties, gettopLocationForOrgaization, getTopOrganizations } from "../controllers/locationController";

const router = Router()

//(2) אזורים עם כמות נפגעים הגבוהה ביותר, ובמקרה שישלח אזור נחזיר את כמות הנפגעים הכי גדולה 
router.get("/top-location",getPlacesWithMostCasualties)

//(4) יחזיר את 5 המובלים בתקריות באופן כללי, ואם יקבל אזור יחזיר לפי אותו אזור
router.get("/top-organization",getTopOrganizations)

//(6) יקבל שם של ארגון ויחזיר אפה היה לאותו ארגון התקפות עם הכי הרבה נפגעים
router.get("/top-location-for-organization",gettopLocationForOrgaization)

export default router