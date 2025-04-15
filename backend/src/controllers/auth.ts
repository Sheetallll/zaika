import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models";
import { CONSTANTS } from 'src/constants';

dotenv.config();


// const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const signToken = (id: string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }


    const token = jwt.sign({ id: String(id) }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as jwt.SignOptions);

    return token;
};


export const registerOrLogin = async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    try {
        const _user = await User.findOne({ email }).select("+password").exec();

        if (_user) {
            const isPasswordValid = await bcrypt.compare(password, _user.password as string);
            
            if (!isPasswordValid) {
                return res.status(400).json({ error: "Invalid email or password" });
            }

            const token = signToken(_user._id.toString());
            return res.status(200).json({ token, email, id: _user._id });
        }

        const hashedPassword = await bcrypt.hash(password, CONSTANTS.SALT);
        const newUser = await User.create({ email, password: hashedPassword });

        const token = signToken(newUser._id.toString());
        return res.status(201).json({ token, email: newUser.email, id: newUser._id });
    } catch (error) {
        console.error("Error in registerOrLogin:", error);
        return res.status(500).json({ error: "An error occurred while processing your request" });
    }
};

