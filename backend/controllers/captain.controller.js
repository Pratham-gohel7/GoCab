import Captain from "../models/captain.model.js";
import blackListToken from "../models/blackListToken.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const captainExist = await Captain.findOne({ email });
    if(captainExist) {
        return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        model: vehicle.model,
        number: vehicle.number,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = await captain.generateAuthToken();

    res.status(201).send({ captain, token });
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select("+password");
    if(!captain) {
        return res.status(400).json({ message: "invalid Email or Password" });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const token = await captain.generateAuthToken();
    res.cookie("token", token);
    res.send({ captain, token });
}

export const getCaptainProfile = async (req, res, next) => {
    const captain = req.captain;
    res.status(200).send({captain});
}

export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blackListToken.create({ token });
    res.clearCookie("token");
    res.status(200).send({ message: "Logged out successfully" });
}