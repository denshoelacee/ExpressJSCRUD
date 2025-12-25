import UserRepository from '../Repository/UserRepository.js';
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
class AuthService {
    //Register Function 
    async register(user) {
        //email uniqueness check
        const email = user.email.toLowerCase();
        // check if email already exists
        const existingUser = await UserRepository.findByEmail(email);
        // if exists, throw error
        if (existingUser) {
            throw new Error("Email address already exists!");
        }

        // hashed password and create user
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await UserRepository.createUser({
        ...user,
        password: hashedPassword,
        });
        // return created user
        return newUser;
    }

    // Login Function 
    async login(user) {
        //check email existence
        const email = user.email.toLowerCase();

        // find user by email 
        const existingUser = await UserRepository.findByEmail(email);
        if (!existingUser) throw new Error('User not found');

        // compare password if matched make a jwt token with 24hr expiry
        const valid = await bcrypt.compare(user.password, existingUser.password);
        if (!valid) throw new Error('Invalid password');
        // generate jwt token
        const token = jwt.sign(
            { 
            user: existingUser 
            }, 
            process.env.JWT_SECRET , 
            { 
                expiresIn: '24h' 
            }
        );

        //return token and user details
        return { token, user: existingUser};
    }
} 

export default new AuthService();