import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;
    const hashedPassword = await User.hashPassword(password);

    // const user = await createUser({ 
    //     firstName: fullName.firstName, 
    //     lastName: fullName.lastName, 
    //     email, 
    //     password: hashedPassword 
    // });

    const user = await User.create({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword
    });

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
} 


export const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
}