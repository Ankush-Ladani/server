import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import {
  index,
  deleteTransaction,
  addTransaction,
  updateTransaction,
} from "../controllers/TransactionController.js";

const router = Router();

router.get("/", index);

router.delete("/:id", deleteTransaction);

router.post("/", addTransaction);

router.patch("/:id", updateTransaction);

export default router;
