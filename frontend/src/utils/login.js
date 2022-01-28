export default function isLoggedIn(){
    let details = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
    if(details) return true
    return false
}