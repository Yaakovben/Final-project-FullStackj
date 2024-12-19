import { Router } from "express";
import { getRatingTypesAttacks } from "../controllers/typesAttackController";

const router = Router()
//(1) סוגי תקיפות מדורגים לפי מספר נפגעים
router.get("/get-rating",getRatingTypesAttacks)

export default router