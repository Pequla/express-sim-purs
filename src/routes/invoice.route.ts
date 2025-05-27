import { Router } from "express";
import { defineRequest } from "../utils";
import { InvoiceService } from "../services/invoice.service";

export const InvoiceRoute = Router()

InvoiceRoute.get('/:token', async (req, res) => {
    await defineRequest(res, async () => {
        const token = String(req.params.token)
        return await InvoiceService.getInvoiceByToken(token)
    })
})

InvoiceRoute.post('/', async (req, res) => {
    await defineRequest(res, async () => 
        await InvoiceService.createInvoice(req.body)
    )
})