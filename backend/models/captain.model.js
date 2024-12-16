import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minLength: [3, "First name must be at least 3 characters"]
        },
        lastName:{
            type: String,
            required: true,
            minLength: [3, "Last name must be at least 3 characters"]
        }
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    socketId:{
        type: String
    },
    status: {
        type: String,
        default: "inactive",
        enum: ["active", "inactive"]
    },
    vehicle: {
        model: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        }
    },
    location: {
        latitude: {
            type: Number,
        },
        longtitude: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;