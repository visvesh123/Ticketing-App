import { Publisher , OrderCreatedEvent , Subjects} from "@ticketsvn/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject : Subjects.OrderCreated = Subjects.OrderCreated

}




