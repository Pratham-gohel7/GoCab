import Captain from "../models/captain.model.js";

const createCaptain = async ({firstName, lastName, email, password, model, number, capacity, vehicleType}) => {
    if(!firstName || !lastName || !email || !password || !model || !number || !capacity || !vehicleType) {
        throw new Error('Please fill in all fields');
    }

    const captain = await Captain.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            model,
            number,
            capacity,
            vehicleType
        }
    });

    return captain;
}

export { createCaptain };