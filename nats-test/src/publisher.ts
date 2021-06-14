import nats from 'node-nats-streaming'
import { TicketCreatedListener } from './events/ticket-created-listener';
import { TicketCreatedPublisher} from './events/ticket-created-publisher'


console.clear()
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});




stan.on('connect', async ()=>{
    console.log('Publisher connected to NATS')

    const publisher = new TicketCreatedPublisher(stan)
    try{

     await  publisher.publish({
            id:'qwe',
            title:'hello',
            price:20
        })
    }
    catch(err){
        console.error(err)
    }


    // const data = JSON.stringify({
    //     id: 123,
    //     title : "concert",
    //     price : 30
    // })

    // stan.publish('ticket:created', data , ()=>{
    //     console.log('Published data ')
    // })
}) 