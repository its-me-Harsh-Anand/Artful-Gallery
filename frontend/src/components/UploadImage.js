import ProgressBar from './ProgressBar';
import React, { useState } from 'react';

function UploadImage() {
    const [file, setFile] = useState(null)

    const allowed = ["image/png", "image/jpeg", "image/jpg"]

    function handleUploadImage(e){

        let selected = e.target.files[0]

        if(selected && allowed.includes(selected.type)){
            setFile(selected)
        }else{
            setFile(null)
            alert("Please select image of type .png, .jpeg or .jpg")
        }
    }

  return (
      <form>
          <div 
            className="input-wrapper"
            style={{
                backgroundImage: `url('/assets/add.svg')`
            }}
          >
            <input 
                type="file" 
                name="inputfile"
                onChange={(e)=> handleUploadImage(e)}
            />
          </div>

          <div className="upload__image-output">
            {
                file && <ProgressBar file={file} setFile={setFile}/>
            }
          </div>
      </form>
  )
}

export default UploadImage;
