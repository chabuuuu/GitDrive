import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export class UserModel{
    async createNewUser(name: string, username: string, password: string) {
        try {
            console.log(name + ': ' + username + password);
            
            const user: any = await prisma.user.create({
                data: {
                  name: name,
                  username: username,
                  password: password,
                }, 
        })
        return user;
        } catch (error: any) {
            throw new Error(error.message)
        }

    }
    async findByUsername(username: string){
        try{
            const user: any = await prisma.user.findFirstOrThrow(
                {
                    where: 
                    {
                        username: username
                    }
                },
            );
            return user;
        }
        catch(error: any){
            throw new Error(error.message)
        }
    }
}
