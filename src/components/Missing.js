import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
    return (
        <section>
            <div>Missing Page</div>
            <p>The Page you're looking for could not be found</p>
            <Link to='/'>Home</Link>
        </section>
    )
}

export default Missing