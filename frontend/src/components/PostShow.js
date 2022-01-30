import React from 'react';

function PostShow(props) {
  const postlink = props.postlink
  return (
    <img src={postlink} alt="my post" className="postshow"/>
  )
}

export default PostShow;
