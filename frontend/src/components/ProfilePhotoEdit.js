import React, { useState } from "react";
import Layout from "./Layout";
import ProgressDpBar from "./ProgressDPbar";

function ProfilePhotoEdit() {
  const [file, setFile] = useState(null);

  const allowed = ["image/png", "image/jpeg", "image/jpg"];

  function handleUploadImage(e) {
    let selected = e.target.files[0];

    if (selected && allowed.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      alert("Please select image of type .png, .jpeg or .jpg");
    }
  }

  return (
    <Layout title="Edit DP">
      <div className="register_div">
        <form>
          <div
            className="input-wrapper"
            style={{
              backgroundImage: `url('/assets/add.svg')`,
            }}
          >
            <input
              type="file"
              name="inputfile"
              onChange={(e) => handleUploadImage(e)}
            />
          </div>

          <div className="upload__image-output">
            {file && <p className="file_name">{file.name}</p>}
          </div>
          <div>
            {file && <ProgressDpBar file={file} setFile={setFile}/>}
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ProfilePhotoEdit;
