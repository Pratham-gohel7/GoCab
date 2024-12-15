import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", [
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], register);

router.post("/login", [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], login)

export default router;