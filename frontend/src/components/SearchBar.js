import axios from 'axios';
import React, {useState, useEffect} from 'react';

function SearchBar(props) {
  const {mobile} =  props
  const [searched, setSearched] = useState("")
  const [searchedResults, setSearchedResults] = useState([])
  const [alluser, setAlluser] =  useState([])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/allusers`)
    .then(response => {
      setAlluser(response.data)
    })
    .catch(err => console.log(err))
  }, [])


  useEffect(()=>{
    if(searched===''){
      setSearchedResults([])
    } else {
      const results = alluser.filter((user) => {
        return user.username.toLowerCase().indexOf(searched.toLowerCase()) !== -1 || user.fullname.toLowerCase().indexOf(searched.toLowerCase()) !== -1
      })
      setSearchedResults(results)
    }
  }, [searched, alluser])



  return (
    <div className="search_main-box">
  <input 
    type="search" 
    className={`${!mobile?"header_input":"search-mobile-input"}`}
    placeholder="Search..."
    value={searched}
    onChange={(e)=> setSearched(e.target.value)}
  />

  <div className={`${!mobile ? "searched-main-div" : "search-mobile-box"}`}>
    { 
    searchedResults.length > 0 && 
      searchedResults.map((result, index) => {
        return <div key={index} className={`${!mobile ? "searched-result" : "search-mobile-result"}`}>
          <a href={`/profile/${result.username}`}>{result.username}</a>
          <a href={`/profile/${result.username}`}>{result.fullname}</a>
        </div>
      })
    }
  </div>
    </div>
  )
}

export default SearchBar;
