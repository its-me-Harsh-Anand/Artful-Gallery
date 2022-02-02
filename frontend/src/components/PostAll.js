import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

function PostAll() {
  const [posts, setPost] = useState([])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/allposts`)
      .then(res => res.data)
      .then(data => setPost(data))
  },[posts])

  return (
    <>
      {
        posts.map((post, index)=>{
          return <img 
            src={post} 
            key={index} 
            alt="Loading..."
            style={{
              maxHeight: `100%`,
              maxWidth: `100%`,
              width: `100%`,
              height: 'auto',
            }}
          />
        })
      }
    </>
  )
}

export default PostAll;
