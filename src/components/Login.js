import jwt from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

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
            const accessToken = response?.data?.accessToken;

            const userData = jwt(accessToken);
            // console.log('User data : ', userData);

            const roles = userData.UserInfo.roles;
            setAuth({ user, pwd, roles, accessToken });
            // setUser('');
            resetUser();
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

    // const togglePersist = () => {
    //     setPersist(prev => !prev);
    // }

    // useEffect(() => {
    //     localStorage.setItem("persist", persist);
    // }, [persist])

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
                    {...userAttribs}
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
                <div className='persistCheck'>
                    <input
                        type="checkbox"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor='persist'>Trust This Device</label>
                </div>
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