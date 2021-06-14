import { sign } from 'jsonwebtoken'
import request from 'supertest'
import { app } from '../../app'
import { signinRouter } from '../signin'


it('Sends current user after creating jwt', async ()=>{

    const cookie = await global.signin()


   

    const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie )
    .send()
    
    

})

it('responds with null if not authenticated', async ()=>{
    const response =  await request(app)
                        .get('api/users/currentuser')
                        .send()
                        .expect(200)

            expect(response.body.currentUser).toEqual(null)
})