import React from 'react';

function PostShow(props) {
  const postlink = props.postlink
  return (
    <img src={postlink} alt="Loading..." className="postshow"/>
  )
}

export default PostShow;
