import request from 'supertest'
import { app } from '../../app'


it('fails when existing mail is not supplied ', async ()=>{

    await request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password : "password"
    })
    .expect(400)
})

it('fails when incorrect password is supplied', async ()=>{

    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password : "password"
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password : "passw"
    })
    .expect(400)
})

it('returns a cookie when suucessfully signed in', async ()=>{

    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password : "password"
    })
    .expect(201)

 const response =   await request(app)
    .post('/api/users/signin')
    .send({
        email: "test@test.com",
        password : "password"
    })
    .expect(200)


    expect(response.get('Set-Cookie')).toBeDefined()


})

    
