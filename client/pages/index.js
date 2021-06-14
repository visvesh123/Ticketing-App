import buildClient from '../api/build-client'

const Landingpage = ({ curentUser}) =>{

return curentUser ? (<h1>You are signed in </h1>): (<h1>You are NOT signed in</h1>)

};

Landingpage.getInitialProps = async (context)=>{
    const { data } =  await buildClient(context).get('/api/users/currentuser')
    
    return data;
}


export default Landingpage;