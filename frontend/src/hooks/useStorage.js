import { useState, useEffect } from "react";
import { imageStorage, ref, uploadBytesResumable, getDownloadURL } from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(()=>{
        const storageRef = ref(imageStorage, `${new Date().getTime()+ file.name}`)

        const uploadImage = uploadBytesResumable(storageRef, file)

        uploadImage.on("state_changed", (snapshot)=>{
            let percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(percentageUpload)
            
        }, (err)=>{
            setError(err)
        }, async ()=>{
            await getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL)
            })
        })
    }, [file])

    return { progress, url, error}
}

export default useStorage