import { MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'

import jwt from 'jsonwebtoken'


declare global {
    namespace NodeJS{
        interface Global{
            signin() :  string[]
        }
    }
}

var  mongo : any ;
beforeAll(async ()=>{
    process.env.JWT_KEY = 'asdf'
     mongo = new MongoMemoryServer()
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri , {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
})

beforeEach(async ()=>{
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async ()=>{
    await mongo.stop()
    await mongoose.connection.close();
})

jest.mock('../nats-wrapper')

global.signin =  ()=> {

    const payload = {
        id : mongoose.Types.ObjectId().toHexString(),
        email : 'hello@3.com'
    }

const token = jwt.sign(payload, process.env.JWT_KEY ! )

const session = { jwt : token}
const sessionJSON = JSON.stringify(session)

const base64 = Buffer.from(sessionJSON).toString('base64')

return [`express:sess=${base64}`]


    
}
