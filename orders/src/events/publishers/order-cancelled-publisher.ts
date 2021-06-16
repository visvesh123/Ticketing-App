import { Publisher , OrderCancelledEvent , Subjects} from "@ticketsvn/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject : Subjects.OrderCancelled = Subjects.OrderCancelled

}




