import React from "react";
import "../css/app.css"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from "./Home";
import Layout from "./Layout";
import Contact from "./Contact";
import NotFound from "./NotFound";

function App (){
  return (
    <Router>
      <Layout>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route path ="*" element={<NotFound />} />
        </Routes>

      </Layout>
    </Router>
  )
}

export default App;
