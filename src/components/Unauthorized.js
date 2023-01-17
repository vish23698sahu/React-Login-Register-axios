import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <div>Unauthorized </div>
            <br />
            <p>You Don't have permissions to access the requested Page.</p>
            <div className='flexGrow'>
                <button onClick={goBack} >Go Back</button>
            </div>
        </section>
    )
}

export default UnAuthorized