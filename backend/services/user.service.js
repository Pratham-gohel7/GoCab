import User from "../models/user.model.js";

const createUser = async ({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password) {
        throw new Error('Please fill in all fields');
    }

    const user = User.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}

export { createUser };