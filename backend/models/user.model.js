import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    }
}, {timeStamps: true});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model("User", userSchema);
export default User;