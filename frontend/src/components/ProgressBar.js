import React from 'react';
import useStorage from '../hooks/useStorage';

function ProgressBar(props) {
    const { file, setFile } = props
    const { url, progress } = useStorage(file)


    console.log(progress, url)
  return (
    <div
        style={{
            position: 'absolute',
            top: '10px',
            left: '0px',
            width: progress + '%',
            backgroundColor: 'pink',
            height: '3px',
            margin: '0px 10px'
        }}
    ></div>
  )
}

export default ProgressBar;
