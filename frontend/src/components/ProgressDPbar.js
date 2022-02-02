import React, { useEffect } from "react";
import useDpStorage from "../hooks/useDpStorage";

function ProgressDpBar(props) {
  const { file, setFile } = props;
  const { url, progress } = useDpStorage(file);
  

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <div className="progress_bar" style={{ width: progress + "%" }}></div>;
}

export default ProgressDpBar;
