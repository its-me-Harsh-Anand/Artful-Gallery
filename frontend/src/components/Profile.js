import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Layout from './Layout.js'
import PostShow from './PostShow.js';
import NotFound from './NotFound'


function Profile() {
  const { username } = useParams()
  const [user, setUser] =  useState({})
  const [userbackend, setUserbackend] = useState({})


  useEffect(()=>{
    const getUserDetails = async () =>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/username/${username}`)
        const data = response.data;
        setUserbackend(data)
      } catch (error){
        console.log(error)
      }
    }
    getUserDetails()
  }, [username])

  useEffect(()=>{
    const userfromLS = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
    setUser(userfromLS)
  }, [])

  console.log(userbackend)
  return (
      <Layout title="Artful Profile">
        { userbackend && userbackend.stat &&
          <div className="profile_main-div">
          <div className="profile">
            <img src="/assets/dummyUser.jpg" alt="my image"/>
            <div className="about">
              <div className="about_profile-details">
                <div className="profile-username">
                  <h3>{userbackend.user.username}</h3>
                  <h4>Username</h4>
                </div>
                
                <div className="profile-username">
                  <h3>{userbackend.user.about.fullname}</h3>
                  <h4>Name</h4>
                </div>
              </div>

              <div className="profile-description">{userbackend.user.about.description}</div>
              <div className="profile-buttons">
              {
                user.username === username &&
                <button className="btn btn--primary">
                  <a href={`/profile/${user.id}/edit`}>
                    Edit Profile
                  </a>
                </button>
              }
              <button className="btn btn--primary">
                <a href={`mailto:${userbackend.user.about.email}`}>
                  Contact me
                </a>
              </button>
              </div>
              
            </div>

              <hr/>

          </div>
              <h3>My Posts</h3>
            <div className="profile_post-images">
            {
              userbackend.user.posts.map((post, index) =>{
                return <PostShow key={index} postlink = {post} />
              })
            }
            {
              userbackend.user.posts.length === 0 && 
              <div>
                {
                  user.username !== username && <h3>Oops! No Posts Found.</h3>
                }
                {
                  user.username === username && <h3>Add some posts to showcase to the world</h3>
                }       
              </div>
            }
            </div>
            
        </div>
        }
        {
          userbackend.stat || <NotFound />
        }
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
