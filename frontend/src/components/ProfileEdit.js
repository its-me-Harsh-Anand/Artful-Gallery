import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";

function ProfileEdit() {
    const navigate = useNavigate()
  const { id } = useParams();
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [description, setDescription] = useState("")
  
  function handleUserEdit(e){
      e.preventDefault()
      const details = {
          fullname: fullname,
          email: email,
          contact: number,
          description: description
      }

      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/update/about/${id}`, details)
      .then(response => {
          if(response.data.message){
              alert("Your profile is updated")
              navigate('/')
          }else{
              alert("Error occured while updating your profile. Please try again.")
          }
      })
      .catch(err => console.log(err))

  }
  
  useEffect(() => {
      const getUserDetails = async () => {
      try {
          const response = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/user/${id}`
              );
              const data = response.data;
              setFullname(data.about.fullname)
              setNumber(data.about.number)
              setEmail(data.about.email)
              setDescription(data.about.description)
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetails();
    }, []);

  return (
    <Layout>
      <div className="register_div">
        <form className="register_form">
          <h3>Edit Your Profile Details</h3>
          <label htmlFor="username" className="register_form-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={fullname}
            id="username"
            className="register_form-input"
            required
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="email" className="register_form-label">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            id="username"
            className="register_form-input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="number" className="register_form-label">Number</label>
          <input
            type="text"
            placeholder="Contact Number"
            name="number"
            value={number}
            id="username"
            className="register_form-input"
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <label htmlFor="description" className="register_form-label">Description</label>
          <textarea
            type="text"
            placeholder="Username"
            name="description"
            value={description}
            id="username"
            className="register_form-input"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          


          <button
            type="submit"
            className="btn btn--primary"
            onClick={(e) => handleUserEdit(e)}
          >
            Submit
          </button>
          <p>Want to edit profile photo? <a href={`/profile/photo/${id}/edit`}>click here</a></p>
        </form>
      </div>
    </Layout>
  );
}

export default ProfileEdit;
