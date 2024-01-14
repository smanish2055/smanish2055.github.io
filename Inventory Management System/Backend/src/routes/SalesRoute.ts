import { Router } from "express";
import {
  salesController,
  getSalesController,
  deleteSalesController,
} from "../controllers/SalesController";
const router = Router();

router.post('/', salesController);
router.get("/getsales", getSalesController);
router.delete("/delete-sale/:id", deleteSalesController);

export default router;