import express from 'express'
import { currentUser} from '@ticketsvn/common'
const router = express.Router()

router.get('/api/users/currentuser', currentUser  , (req,res)=>{

    res.send({curentUser : req.currentUser || null})
   

})

export { router as currentUserRouter }

