import mongoose from 'mongoose'
import {  Order}from './order'
import {OrderStatus} from '@ticketsvn/common'

interface TicketAttrs{
    title : string,
    price : number

}

export interface TicketDoc extends mongoose.Document{
    title : string,
    price : number,
    isReserved() : Promise<boolean>

}

interface TicketModel extends mongoose.Model<TicketDoc>{

    build(attrs : TicketAttrs) : TicketDoc
}


const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    price : {
        type : Number,
        required : true,
        min : 0
    }


}, {
    toJSON : {
        transform(doc , ret){
            ret.id = ret._id;
            delete ret._id
        
        }
    }
} )

ticketSchema.statics.build = (attrs : TicketAttrs)=>{
    return new Ticket(attrs)
}
ticketSchema.methods.isReserved = async function(){
    const existingOrder = await Order.findOne({
      
        status : {
            $in : [
                OrderStatus.Created, OrderStatus.AwaitingPayment , OrderStatus.Complete
            ]
        },
        ticket : this.id
    })
    return !!existingOrder;
}
const Ticket = mongoose.model<TicketDoc,TicketModel>('Ticket', ticketSchema)

export { Ticket}

