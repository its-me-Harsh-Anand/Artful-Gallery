import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Layout from './Layout'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY

  useEffect(()=>{
    if(localStorage.getItem(LOCAL_STORAGE_KEY)){
      alert("You are already logged in. Log out first to continue")
      navigate('/')
    }
  },[])
  
  async function handleUserRegister(e){
    e.preventDefault()

    if(username.includes(" ") || password.includes(" ")){
      alert("Don't use spaces in username or password")
      return
    }

    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/username/${username}`)
    .then(res => res.data)
    .then(data => {
      if((data.user?.username === username.trim()) && (data.user?.password === password.trim())){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({id: data.user._id, username: data.user.username, loggedin : true}))
        alert("Logged in Successfully")
        navigate('/')
      }else{
        alert("Incorrect username or password")
      }
    }).catch(err=> alert("Oops! Error occured while signing you in"))
      
  }

  return (
    <Layout title="Login">
      <div className="register_div">
        <form className="register_form">
        <h3>Login</h3>
            <label htmlFor="username" className="register_form-label">Username</label>
            <input 
              type="text" 
              placeholder="Username"
              name="username" 
              value={username}
              id="username" 
              className="register_form-input"
              required
              onChange={(e)=>setUsername(e.target.value)}
            />
            <label htmlFor="password" className="register_form-label">Password</label>
            <input 
              type="text" 
              name="password" 
              id="password" 
              className="register_form-input"
              placeholder="Password"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            <button 
              type="submit" 
              className="btn btn--primary"
              onClick={(e)=> handleUserRegister(e)}
            >
              Login
            </button>
            <p className="login_para">Not Registered yet! <Link to='/register'>Register here</Link></p>
        </form>
        </div>
    </Layout>
  )
}

export default Login;
