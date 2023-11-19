import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api';

import './style.css';

const SignUp = () => {
    const [cookies, setCookie] = useCookies();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error('All fields are compulsory');
            return;
        }

        if (password.length < 8) {
            toast.error('Password should be at least 8 characters');
            return;
        }

        try {
            const res = await axios.post(`${API}/v1/u/createUser`, {
                name,
                email,
                password,
            });

            if (res.data.success) {
                setCookie('token', res.data.token);
                navigate('/');
                toast.success('Logged In');
            } else {
                toast.error('Please enter valid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error creating user. Please try again.');
        }
    };

    return (
        <div class="container-signup">
            <div class="signup">
                <p class="quote">Register<span> Buddy</span> </p>
                <form id="signup-form" onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className="input-signup"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name" />

                    <input onChange={(e) => setEmail(e.target.value)}
                        className="input-signup"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address" />


                    <input onChange={(e) => setPassword(e.target.value)}
                        className="input-signup"
                        type="password"
                        id="password"
                        name="password" placeholder="Password" />

                    <button id="signup-btn">Signup</button>
                    <span >Already have an account? <Link to={'/login'}>Login here</Link></span>
                    
                </form>

            </div>
        </div>
    );
};

export default SignUp;
