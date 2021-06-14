import express from 'express';
import 'express-async-errors'
import {json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler , NotFoundError , currentUser} from '@ticketsvn/common'

import { newOrderRouter } from './routes/new';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';

const app = express()


app.set('trust proxy', true)

app.use(json())
app.use(cookieSession({
     secure: process.env.NODE_ENV !== 'test',
     signed:false
}))

app.use(currentUser)

app.use(newOrderRouter)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)

app.use(errorHandler)


app.all('*', async()=>{
throw new NotFoundError()
})



export { app}
 