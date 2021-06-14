import  { Publisher , Subjects , TicketCreatedEvent} from '@ticketsvn/common'


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject : Subjects.TicketCreated =  Subjects.TicketCreated
    


}