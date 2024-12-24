import { Router } from "express";
import { addNewEvent, getAllEvents } from "../controllers/crudController";

const router = Router()

router.get("/get-all",getAllEvents)
router.get("/add-new",addNewEvent)


export default router