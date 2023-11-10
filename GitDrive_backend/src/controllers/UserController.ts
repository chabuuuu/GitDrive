import { UserModel } from "../models/user";
import { HashPassword } from "../utils/HashPassword";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModel = new UserModel();
const hashPassword = new HashPassword(); 
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
}