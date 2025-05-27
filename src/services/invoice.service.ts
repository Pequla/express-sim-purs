import { randomUUIDv7 } from "bun";
import { AppDataSource } from "../db";
import { Invoice } from "../entities/Invoice";
import { Item } from "../entities/Item";
import type { InvoiceModel } from "../models/invoice.model";
import { dataExists } from "../utils";
import { UserService } from "./user.service";
import { IsNull } from "typeorm";

const invoiceRepo = AppDataSource.getRepository(Invoice)
const itemRepo = AppDataSource.getRepository(Item)

export class InvoiceService {
    static async createInvoice(model: InvoiceModel) {
        const user = await UserService.getUserByIndeksAndToken(model.indeks, model.token)
        const invoice = await invoiceRepo.save({
            userId: user.userId,
            customer: model.customer,
            address: model.address,
            taxId: model.taxId,
            token: randomUUIDv7(),
            createdAt: new Date()
        })

        console.log(model)

        for (let item of model.items) {
            await itemRepo.save({
                invoiceId: invoice.invoiceId,
                name: item.name,
                amount: item.amount,
                price: item.price,
                createdAt: new Date()
            })
        }

        console.log(invoice)

        return {
            token: invoice.token
        }
    }

    static async getInvoiceByToken(token: string) {
        const data = await invoiceRepo.findOne({
            select: {
                invoiceId: true,
                customer: true,
                address: true,
                taxId: true,
                createdAt: true,
                items: {
                    itemId: true,
                    amount: true,
                    name: true,
                    price: true
                }
            },
            where: {
                token: token,
                user: {
                    deletedAt: IsNull()
                }
            },
            relations: {
                items: true
            }
        })

        return dataExists(data)
    }
}