import React from "react";
import "../css/app.css"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Layout from "./Layout";
import Contact from "./Contact";
import NotFound from "./NotFound";
import Register from "./Register";
import Header from "./Header";
import Login from "./Login";
import Profile from "./Profile";
// import isLoggedIn from "../utils/login";

function App (){
  //console.log(isLoggedIn()) //use this function anywhere to see if user is logged in or not
  return (
    <Router>
      <Header />
      <Layout>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile/:username' element={<Profile />} />
          <Route path ="*" element={<NotFound />} />
        </Routes>

      </Layout>
    </Router>
  )
}

export default App;
