import React, { useEffect } from 'react';
import isLoggedIn from '../utils/login';
import Post from './Post';
import {useNavigate} from "react-router-dom"
function Home() {
  const navigate = useNavigate()

  useEffect(()=>{
    const login = isLoggedIn()
    if(!login) navigate('/register')
  }, [])

  return (
  <div className="home_main">
      <div className="posts_main">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Home;
