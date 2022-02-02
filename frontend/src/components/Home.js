import React, { useEffect } from 'react';
import isLoggedIn from '../utils/login';
import PostAll from './PostAll';
import Layout from './Layout'
import {useNavigate} from "react-router-dom"
import { imageStorage } from '../firebase/config.js'

function Home() {
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(!isLoggedIn()) navigate('/login')
  }, [])

  return (
    <Layout>
      <div className="home_main">
          <div className="posts_main">
            <PostAll />
          </div>
        </div>
    </Layout>
  )
}

export default Home;
