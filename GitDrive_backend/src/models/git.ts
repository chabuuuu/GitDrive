import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()
export class GitModel{
    async createNewGitAccount(gitToken: string, userID: number, gitUserName: string) {
        try {
            
            const user: any = await prisma.git.create({
                data: {
                  userId: Number(userID),
                  GitToken: gitToken,
                  username: gitUserName,
                }, 
        })
        return user;
        } catch (error: any) {
            console.log(error.message);
            
            throw new Error(error.message)
        }

    }
}
