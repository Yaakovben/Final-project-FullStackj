import { Router } from "express";
import { getAllEvents } from "../controllers/crudController";

const router = Router()

router.get("/get-all",getAllEvents)


export default router