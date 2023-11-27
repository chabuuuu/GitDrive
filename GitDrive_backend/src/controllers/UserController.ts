import { UserModel } from "../models/user";
import { HashPassword } from "../utils/HashPassword";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = new UserModel();
const hashPassword = new HashPassword(); 
const jwt = require('jsonwebtoken');
UserModel
export class UserController{
    async Register(req: any, res: any, next: any){
        const data = req.body;  
        const name = data.name;
        const username = data.username;
        const password = data.password;
        console.log(data);
        
        var hashedPassword: string = "";
        try {
            hashedPassword = await hashPassword.hash(password);
            console.log(hashedPassword);
            
            const resp = await userModel.createNewUser(name, username, hashedPassword);
            res.json({"status": "OK", "resp": resp});
        } catch (error: any) {
            console.log(error.message);
            
            res.json({"status": "ERROR", "error": error.message});
        }
    }
    async login(req: any, res: any, next: any){
        try {
            const matchUsername = await userModel.findByUsername(req.body.username);
            const match: any = await hashPassword.compare(
                req.body.password,
                matchUsername.password,
            );
            if (match) {
                const token = jwt.sign(
                    { id: matchUsername.id, password: matchUsername.password },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN },
                );
                console.log(token);
                res.json({"status": "Login success","token": token})
            } else {
                throw new Error('Can not sign token')
            }
        } catch (error: any) {
            throw new Error(error.message);
        }

    }
}