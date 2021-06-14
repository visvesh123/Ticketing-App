import request from 'supertest'
import { app} from '../../app'
import { Ticket } from '../../models/ticket'
import { natsWrapper} from '../../nats-wrapper'




it('TO check if /api/ticekts post ' , async ()=>{
    const response =  await request(app).post('/api/tickets')
        .send({})
    
    expect(response.status).not.toEqual(404)

})


it('TO check if user is signed in  ' , async ()=>{
 await request(app).post('/api/tickets')
            .send({}).expect(401)
})

it('TO check if user  is not  signed in  ' , async ()=>{
    const response =  await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({})

       expect(response.status).not.toEqual(401)
   })
   

it('If invalid title is provided ' , async ()=>{
    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({ title : '', price : 10}).expect(400)

    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({  price : 10}).expect(400)

    
})

it('If invalid price is provided ' , async ()=>{
    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({ title : 'heelo', price : -10}).expect(400)

    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({ title : 'heelo'}).expect(400)
    
})

it('Creates a ticket with valid inputs' , async ()=>{


    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)


    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({ title : 'hello' , price: 20}).expect(201)

     tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(20)
})

it('publishes an event' , async ()=>{

    await request(app).post('/api/tickets').set('Cookie', global.signin())
    .send({ title : 'hello' , price: 20}).expect(201)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
} )