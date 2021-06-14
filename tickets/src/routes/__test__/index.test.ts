import  request  from 'supertest'
import { app} from '../../app'

const createTicket = ()=> request(app).post('/api/tickets').set('Cookie', global.signin())
.send({ title: 'asdf' , price: 20 })
.expect(201)


it('Returns all tickets ', async ()=>{

await createTicket()
await createTicket()
await createTicket()

const response = await request(app).get('/api/tickets').send().expect(200)
expect(response.body.length).toEqual(3)


})