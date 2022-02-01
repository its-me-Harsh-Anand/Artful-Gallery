import axios from "axios";
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
                const post = {
                    post: downloadURL
                }
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/update/posts/${JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)).id}`, post)
                .then(res => alert(res.data.message))
                .catch(err=> console.log(err))
                console.log(post, JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)).id)
            })
        })
    }, [file])

    return { progress, url, error}
}

export default useStorage