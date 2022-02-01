import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY

  useEffect(()=>{
    if(localStorage.getItem(LOCAL_STORAGE_KEY)){
      alert("You are already logged in. Log out to register a new account")
      navigate('/')
    }
  },[])
  
  async function handleUserRegister(e){
    e.preventDefault()

    if(username.includes(" ") || password.includes(" ")){
      alert("Don't use spaces in username or password")
      return
    }

    if(username.length <6){
      alert("Username must be of atleast 6 character long")
      return
    }
    if(password.length <6){
      alert("Password must be of atleast 6 character long")
      return
    }

    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/username/${username}`)
    .then(res => res.data)
    .then(data => {
      if(data.stat !== false) {
        alert(`Username : ${username} already taken.`)
        return
      }
    })
  
      
    const newuser = await {username: username, password: password}

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, newuser)
    .then(res => {
      alert(res.data.message)
      if(res.data.stat === true){
        if(localStorage.getItem(LOCAL_STORAGE_KEY)){
          localStorage.clear()
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({id: res.data.id, username: res.data.username,loggedin : true}))

        navigate(`/profile/${JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).id}/edit`)
      }else{
        alert(res.data.message)
        navigate('/register')
      }
    })
      
  }

  return (
    <Layout title="Register">
      <div className="register_div">
        <form className="register_form">
        <h3>Register with Us</h3>
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
              Register
            </button>
        </form>
        </div>
    </Layout>
  )
}

export default Register;
