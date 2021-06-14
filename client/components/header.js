import Link from 'next/link'

export default ({ curentUser})=>{

    const list = [
       !curentUser &&  { label : 'Sign In ' , href : '/auth/signin'},
       !curentUser && { label : 'Sign Up ' , href : '/auth/signup'},
        curentUser && { label : 'Sign Out ' , href : '/auth/signout'},
    ]
    .filter( linkConfig => linkConfig)
    .map( ({ label , href })=> {
        return <li href={href}  className="nav-item">
            <Link href={href}>
                <a className="nav-link">{label} </a>
            </Link>
            
        </li>
    } )

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand"> GitTix</a>
            </Link>
        
        <div className="d-flex justify-content-end">
            <ul className="nav d-flex align-items-center">
               {list}
            </ul>
        </div>
        </nav>
    )
}