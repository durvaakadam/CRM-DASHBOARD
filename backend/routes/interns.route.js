import express from "express";
import {
  createIntern,
  deleteIntern,
  getAllInterns,
  getInternById,
  updateIntern
} from "../controllers/interncontroller.js";

const router = express.Router();

// Create a new intern
router.post("/", createIntern);

// Get all interns
router.get("/", getAllInterns);

// Get intern by ID
router.get("/:id", getInternById);

// Update intern
router.put("/:id", updateIntern);

// Delete intern
router.delete("/:id", deleteIntern);

export default router;
