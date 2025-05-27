import { Router } from "express";
import { defineRequest } from "../utils";
import { configDotenv } from "dotenv";
import { UserService } from "../services/user.service";

export const UserRoute = Router()

configDotenv()

UserRoute.get('/', async (req, res) => {
    await defineRequest(res, async () => {
        const key = req.headers['x-token']
        if (key == process.env.ADMIN_TOKEN) {
            return await UserService.getAllActiveUsers()
        }
        throw new Error('NOT_FOUND')
    })
})

UserRoute.post('/:indeks', async (req, res) => {
    await defineRequest(res, async () => {
        const key = req.headers['x-token']
        if (key == process.env.ADMIN_TOKEN) {
            const indeks = req.params.indeks
            return await UserService.createUser(indeks)
        }
        throw new Error('NOT_FOUND')
    })
})