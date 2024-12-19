import { Router } from "express";
import { getPlacesWithMostCasualties } from "../controllers/locationController";

const router = Router()

router.get("/top-location",getPlacesWithMostCasualties)

export default router