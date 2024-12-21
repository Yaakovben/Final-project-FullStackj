import { Router } from "express";
import { getAllCities, getPlacesWithMostCasualties, gettopLocationForOrgaization, getTopOrganizations } from "../controllers/locationController";

const router = Router()

//(2) אזורים עם כמות נפגעים הגבוהה ביותר, ובמקרה שישלח אזור נחזיר את כמות הנפגעים הכי גדולה 
router.get("/top-location/:city?",getPlacesWithMostCasualties)

//(4) יחזיר את 5 המובלים בתקריות באופן כללי, ואם יקבל אזור יחזיר לפי אותו אזור
router.get("/top-organization/:city?",getTopOrganizations)

//(6) יקבל שם של ארגון ויחזיר אפה היה לאותו ארגון התקפות עם הכי הרבה נפגעים
router.get("/top-location-for-organization/:organization?",gettopLocationForOrgaization)


router.get("/all-cities",getAllCities)



export default router