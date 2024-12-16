import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import blackListToken from "../models/blackListToken.model.js";

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if(userExist) {
        return res.status(400).json({ error: "User already exists" });
    }
    
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

    res.cookie("token", token);

    res.status(200).send({ user, token });
}

export const getUserProfile = async (req, res, next) => {
    const user = req.user;
    res.status(200).send({ user });
}

export const logout = async (req, res, next) => {
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListToken.create({ token });

    res.status(200).send({ message: "Logged out successfully" });
}
