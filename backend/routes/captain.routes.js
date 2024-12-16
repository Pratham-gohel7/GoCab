import express from "express";
import { body } from "express-validator";

import { registerCaptain } from "../controllers/captain.controller.js";

const router = express.Router();

router.post("/register", [
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("vehicle.model").isLength({ min: 3 }).withMessage("Model must be at least 3 characters"),
    body("vehicle.number").isLength({ min: 3 }).withMessage("Number must be at least 3 characters"),
    body("vehicle.capacity").isLength({ min: 1 }).withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType").isLength({ min: 3 }).withMessage("Vehicle type must be at least 3 characters"),
], registerCaptain);

export default router;