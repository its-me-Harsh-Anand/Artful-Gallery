import axios from "axios";
import React, { useState, useEffect } from "react";
import useStorage from "../hooks/useStorage";

function ProgressBar(props) {
  const { file, setFile } = props;
  const { url, progress } = useStorage(file);
  const [id, setId] = useState("")
  const LOCAL_STORAGE_KEY = process.env.LOCAL_STORAGE_KEY
  

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress_bar" style={{ width: progress + "%" }}></div>;
}

export default ProgressBar;
