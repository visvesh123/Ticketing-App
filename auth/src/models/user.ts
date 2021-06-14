import mongoose from 'mongoose'
import  { Password} from '../services/password'

interface UserAttr{
    email: String;
    password: String
}

interface UserModel extends mongoose.Model <UserDoc> {
    build(attr : UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document{
    email : String;
    password : String;
}
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required :true
    }
},{
    toJSON: {
        transform(doc ,ret){
            delete ret.password
            delete ret.__v
            ret.id = ret._id
            delete ret._id
        }

    }
})

userSchema.pre('save', async function name(done) {
    if( this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
})

userSchema.statics.build = (attr : UserAttr) => {
 return   new User(attr)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)



export { User}