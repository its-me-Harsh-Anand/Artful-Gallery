import axios from "axios";
import { useState, useEffect } from "react";
import { imageStorage, ref, uploadBytesResumable, getDownloadURL } from "../firebase/config";

const useDpStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(()=>{
        const storageRef = ref(imageStorage, `${new Date().getTime()+ file.name + "displayPicture"}`)

        const uploadImage = uploadBytesResumable(storageRef, file)

        uploadImage.on("state_changed", (snapshot)=>{
            let percentageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(percentageUpload)
            
        }, (err)=>{
            setError(err)
        }, async ()=>{
            await getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL)
                const photo = {
                    photo: downloadURL
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/update/photo/${JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)).id}`, photo)
                .then(res => alert(res.data.message))
                .catch(err=> console.log(err))
            })
        })
    }, [file])

    return { progress, url, error}
}

export default useDpStorage