import Captain from "../models/captain.model.js";
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