import axios from 'axios';
import React, { useContext, useState } from 'react'
import {toast} from 'react-hot-toast'
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import TodoContext from '../../context/Todo/TodoContext';
import API from '../../api';


const Login = () => {
    const todoContext = useContext(TodoContext);

    const {cookieState, setCookieState, setCookie, cookies} = todoContext;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();

            if( !email || !password){
                toast.error("All FEILDS are compulsory")
                return
            }

            if(password.length<8){
                toast.error("Password should be atleast of 8 characters")
                return
            }

            const res = await axios.post(`${API}/v1/u/login`,{
                email,
                password
            })
            console.log(res)

            if(res.data.success){
                
                setCookie('token',res.data.token)
                navigate('/')
                toast.success("Logged In")
                
            }
            else{
                toast.error("please enter valid credentials")
            }
       
    }

  
  return (
    <div class="container-signup">
            <div class="signup">
                <p class="quote">Welcome<span> Back</span> </p>
                <form id="signup-form" onSubmit={handleSubmit}>
        
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

                    <button id="signup-btn">Login</button>
                    <span >Don't have an account? <Link to={'/signup'}>Register here</Link></span>
                    
                </form>

            </div>
        </div>
  )
}

export default Login