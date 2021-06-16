import { Subjects , Publisher , ExpirationCompleteEvent} from "@ticketsvn/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleteEvent>{
    subject : Subjects.ExpirationComplete = Subjects.ExpirationComplete
}

