import React from 'react'
import { Link } from 'react-router-dom'


const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <h2>Public</h2>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link><br />
            <h2>Private</h2>
            <Link to='/'>Home</Link>
            <Link to='/editor' >Go to Editor page</Link>
            <Link to='/admin' >Go to Admin page</Link>
        </section>
    )
}

export default LinkPage