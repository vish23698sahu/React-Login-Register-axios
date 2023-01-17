import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import jwt from 'jwt-decode';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);

            const userData = jwt(accessToken);
            console.log(userData);

            // const roles = response?.data?.roles
            const roles = userData.roles;
            console.log('from Login: ', roles);
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing username or password');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password: </label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an account? <br />
                <span className='line'>
                    <Link to='/register'>Sign Up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login