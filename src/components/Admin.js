import React from 'react';
import { Link } from 'react-router-dom';
import Users from './Users';

const Admin = () => {
    return (
        <section>
            <div>Admins Page</div>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin