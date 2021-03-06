import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

function ProgressBar(props) {
  const { file, setFile } = props;
  const { url, progress } = useStorage(file);
  

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress_bar" style={{ width: progress + "%" }}></div>;
}

export default ProgressBar;
