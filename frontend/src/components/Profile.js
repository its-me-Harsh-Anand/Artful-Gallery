import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Layout from './Layout.js'
import PostShow from './PostShow.js';
function Profile() {
  const { username } = useParams()
  const [user, setUser] =  useState({})

  useEffect(()=>{
    const userfromLS = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
    console.log(userfromLS)
    setUser(userfromLS)
  }, [])

  return (
      <Layout title={user.username}>
        <div className="profile_main-div">
          <div className="profile">
            <img src="/assets/dummyUser.jpg" alt="my image"/>
            <div className="about">
              <div className="about_profile-details">
                <div className="profile-username">
                  <h3>{dummy.username}</h3>
                  <h4>Username</h4>
                </div>
                
                <div className="profile-username">
                  <h3>{dummy.name}</h3>
                  <h4>Name</h4>
                </div>
              </div>

              <div className="profile-description">{dummy.description}</div>
              <div className="profile-buttons">
              {
                user.username === username &&
                <button className="btn btn--primary">Edit Profile</button>
              }
              <button className="btn btn--primary">Contact me</button>
              </div>
              
            </div>

              <hr/>

          </div>
              <h3>My Posts</h3>
            <div className="profile_post-images">
            {
              dummy.posts.map((post, index) =>{
                return <PostShow key={index} postlink = {post} />
              })
            }
            </div>
            
        </div>
      </Layout>
  )
}

const dummy = {
  username: "harshit01",
  name: "Harsh Anand",
  email: "harshvivek.787@gmail.com",
  contact: "7488407549",
  description: "I'm a good user and here is my description that will tell everything from my side",
  posts: ["/assets/dummyUser.jpg","/assets/dummyUser.jpg","/assets/dummyUser.jpg"]
}
export default Profile;
