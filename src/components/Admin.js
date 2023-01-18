import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <section>
            <div>Admins Page</div>
            <br />
            <p>You must have been assigned an Admin role.</p>
            <br />
            <br />
            <br />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin