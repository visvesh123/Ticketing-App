import request from 'supertest'
import { app } from '../../app'


it('returns a 201 on succesful signup', async ()=> {
    return request(app)
        .post('/api/users/signup')
        .send({
            email : "set@test.com",
            password: "password"
        }).expect(201)
} )

it('return a 400 on invalid details ', async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email : "settvvom",
        password: "passvcword"
    }).expect(400)

})

it('return a 400 on if email or password is missing', async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email : "set@test.com"
    
    }).expect(400)

    await  request(app)
    .post('/api/users/signup')
    .send({
        password : "password"
    
    }).expect(400)
})

it('disallows duplicate emails ', async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email : "test@test.com",
        password : "password"
    }).expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email : "test@test.com",
        password : "password"
    }).expect(400)


})


it('Sets a cookie after succesful signup', async ()=>{
    const response =   await request(app)
    .post('/api/users/signup')
    .send({
        email : "test@test.com",
        password : "password"
    }).expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})

