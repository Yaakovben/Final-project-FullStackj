import { Router } from "express";
import { getRatingTypesAttacks } from "../controllers/typesAttackController";

const router = Router()

router.get("/get-rating",getRatingTypesAttacks)



export default router