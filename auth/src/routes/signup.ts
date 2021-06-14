import express , {Request,Response} from 'express'
import {body} from 'express-validator'

import { BadRequestError , validateRequest } from '@ticketsvn/common'
import { User} from '../models/user'


import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/api/users/signup',[ 
    body('email').isEmail().withMessage("Valid Email"),
    body('password').trim().isLength({min:4, max:20}).withMessage("Insufficient Length")
], validateRequest,
async (req:Request,res:Response)=>{

    const { email , password} = req.body
    
    
    const existingUser  =  await User.findOne({email})
    
    if(existingUser){
        throw new BadRequestError('Email already exist')
    }
    const user = User.build({ email:email, password:password})
   
    await user.save()

    const userJwt = jwt.sign({id: user.id ,
        email: user.email }, process.env.JWT_KEY!)

    req.session = {
        jwt : userJwt
    }

    res.status(201).send(user)

}
);


export { router as signupRouter }
