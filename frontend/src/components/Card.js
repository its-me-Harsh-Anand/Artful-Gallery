import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import isLoggedIn from '../utils/login'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { MdLogout } from 'react-icons/md'
import SearchBar from './SearchBar'

function Card(props) {
    const navigate = useNavigate()
    const hidden = props.hidden
    const [username, setUsername] = useState('')

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
        if(user){
            setUsername(user.username)
        }else{
            navigate('/login')
        }
    }, [])
    console.log("idLoggedIn",isLoggedIn())

    function handleLogout(){
        localStorage.clear()
        alert("You are logged out!")
        navigate('/login')
    }
  return (
      <div className="header_card" style={{display: hidden?'none':'flex'}}>
          <ul>
              {
                  isLoggedIn() && <input type="search" className="card_input" placeholder="Search..."/>
              }   
              <hr/>
              {
                  isLoggedIn() && <li><CgProfile  className="header_card-icon"/> <a href={`/profile/${username}`} >Profile</a></li>
              }    
              {
                  isLoggedIn() && <li onClick={()=> handleLogout()}><MdLogout className="header_card-icon" /> Logout</li>
              }
              {
                  !isLoggedIn() && <li><Link to= {`/login`} >Login</Link></li>
              }
              
          </ul>
      </div>
  )
}

export default Card;
