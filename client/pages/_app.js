import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({Component , pageProps , curentUser})=>{
    return (<div>
        <Header curentUser = { curentUser}/>
         <Component {...pageProps}/>
    </div>
   )
}

AppComponent.getInitialProps =  async (appContext)=>{
// console.log(Object.keys(appContext))

const client = buildClient(appContext.ctx)

const  { data } = await  client.get('/api/users/currentuser')

let pageProps = {}
if(appContext.Component.getInitialProps){
     pageProps = await  appContext.Component.getInitialProps(appContext.ctx)
}

// console.log(pageProps)
return {pageProps , ...data}
}

export default AppComponent;