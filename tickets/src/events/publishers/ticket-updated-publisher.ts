import  { Publisher , Subjects , TicketUpdatedEvent} from '@ticketsvn/common'


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject : Subjects.TicketUpdated =  Subjects.TicketUpdated
    


}