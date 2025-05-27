import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { dataExists } from "../utils";

const repo = AppDataSource.getRepository(User)

export class UserService {
    static async getUserByIndeksAndToken(indeks: string, token: string) {
        const data = await repo.findOneBy({
            indeks: indeks,
            token: token,
            deletedAt: IsNull()
        })

        return dataExists(data)
    }

    static async createUser(indeks: string) {
        await repo.save({
            indeks: indeks,
            token: indeks,
            key: indeks,
            createdAt: new Date()
        })
    }

    static async getAllActiveUsers() {
        return await repo.find({
            select: {
                userId: true,
                indeks: true,
                createdAt: true
            },
            where: {
                deletedAt: IsNull()
            }
        })
    }
}