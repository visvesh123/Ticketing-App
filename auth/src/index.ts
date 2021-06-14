
import mongoose from 'mongoose'
import { app} from './app'



const start = async ()=>{
     if(!process.env.JWT_KEY){
          throw new Error('JWT_KEY must be defined')
     }
     try{
          await mongoose.connect('mongodb+srv://admin:qscgy123@cluster0.udaef.mongodb.net/auth?retryWrites=true&w=majority',{
               useCreateIndex:true, 
               useNewUrlParser:true,
               useUnifiedTopology:true
          })
          console.log("Connected to db auth")

     } 
     catch(err){
          console.error(err)
     }
     app.listen(3000 , ()=> {
          console.log("Listening on port 3000")
     })
    
}
 
start()







