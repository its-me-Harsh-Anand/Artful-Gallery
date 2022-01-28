import React from 'react';
import {FaHome} from 'react-icons/fa'
import {MdAddCircleOutline} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import {IconContext} from 'react-icons'

function Header() {
  return (
    <>
    <div className="header_mobile">
      <Link to = '/' className="mobile_logo">
        <img src="/assets/logo.PNG" alt="Artful logo" />
      </Link>
    </div>
     
    <div className="header_main">

      <Link to = '/' className="laptop_logo">
        <img src="/assets/logo.PNG" alt="Artful logo" />
      </Link>

      <input type="search" className="header_input" placeholder="Search..."/>

      <div className="header_icons">
          <Link to="/"><FaHome className="header_logo header_logo-home"/></Link>
          <Link to="/post"><MdAddCircleOutline className="header_logo header_logo-add"/></Link>
          <Link to="/profile"><CgProfile className="header_logo header_logo-profile"/></Link>
      </div>
    </div>
    </>
  )
}

export default Header;
