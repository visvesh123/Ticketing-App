import express , { Request , Response } from 'express'
import { requireAuth , validateRequest , NotFoundError, BadRequestError , OrderStatus } from '@ticketsvn/common'
import { body } from 'express-validator'
import mongoose from 'mongoose'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'

const EXPIRATION_WINDOW_TIME = 15 * 60



const router = express.Router()


router.post('/api/orders',[ body('ticketId').not().isEmpty().custom((input : string)=> mongoose.Types.ObjectId.isValid(input))
.withMessage('Ticket Id must be provided')] , validateRequest 
, async(req : Request , res : Response)=>{

    const { ticketId} = req.body

    const ticket = await Ticket.findById(ticketId)
    if(!ticket){
        throw new NotFoundError()
    }

    const isReserved =  await ticket.isReserved()
    if(isReserved){
        throw new BadRequestError('Ticket is already reserved')
    }
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_TIME)

    const order = Order.build({
        userId : req.currentUser!.id,
        status : OrderStatus.Created,
        expiresAt : expiration,
        ticket
    })
    await order.save()

    res.status(201).send(order)
})


export { router as newOrderRouter}