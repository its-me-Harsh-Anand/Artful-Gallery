import React, { useEffect } from 'react';
import isLoggedIn from '../utils/login';
import Post from './Post';
import Layout from './Layout'
import {useNavigate} from "react-router-dom"
function Home() {
  const navigate = useNavigate()
  
  useEffect(()=>{
    const login = isLoggedIn()
    console.log("isLoggedIn from home",login)
    // if(!login) navigate('/login')
  }, [])

  return (
    <Layout>
      <div className="home_main">
          <div className="posts_main">
            <Post />
            <Post />
            <Post />
          </div>
        </div>
    </Layout>
  )
}

export default Home;
