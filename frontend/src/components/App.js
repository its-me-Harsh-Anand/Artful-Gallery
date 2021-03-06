import React from "react";
import "../css/app.css"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import Register from "./Register";
import Header from "./Header";
import Login from "./Login";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import ProfilePhotoEdit from "./ProfilePhotoEdit";

function App (){
  return (
    <Router>
      <Header />
      <Layout>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/profile/:username' element={<Profile />} />
          <Route exact path='/profile/:id/edit' element={<ProfileEdit />} />
          <Route exact path='/profile/photo/:id/edit' element={<ProfilePhotoEdit />} />
          <Route path ="*" element={<NotFound />} />
        </Routes>

      </Layout>
    </Router>
  )
}

export default App;
