import React, { useState } from 'react';

function Register() {
  const [user, setUser] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_KEY

  async function handleUserRegister(e){

    e.preventDefault()
    if(username && password ){
      const newuser = await {username: username.trim(), password: password.trim()}

      
      //For login page to check whether user already logged in or not, don't use it here 
      const recipeJSONfromLS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(recipeJSONfromLS.username === newuser.username && recipeJSONfromLS.password === newuser.password){
        console.log(recipeJSONfromLS, "Already exists")
      }
      

      await setUser(newuser)
      //instead of setting user with useState, send user to backend and then from there take out user while signing in and then set this user in local storage for further user
      await localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newuser))

      setUsername('')
      setPassword('')
      setUser({})
    }
  }


  return (
    <div>
        <form>
            <label htmlFor="username">Username :</label><br />
            <input 
              type="text" 
              name="username" 
              value={username}
              id="username" 
              required
              onChange={(e)=>setUsername(e.target.value)}
            /><br/>
            <label htmlFor="password">Password :</label><br />
            <input 
              type="text" 
              name="password" 
              id="password" 
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
            /><br/>
            <button type="submit" onClick={(e)=> handleUserRegister(e)}>Register</button>
        </form>
    </div>
  )
}

export default Register;
