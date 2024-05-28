import { useEffect, useState } from "react"
import CryptoJS from "crypto-js"
import "./Navbar.css"
const Navbar = () => {
    const [email,setEmail] = useState("")
    const [userData,setUserData] = useState(null)
    const host_url = "https://no23.lavina.tech";


    useEffect(() => {
        getUserData()
    },[])

    const getUserData = async() => {
        try {
            const key = localStorage.getItem("Key")
            // const sign = localStorage.getItem("Sign")
            const secret = localStorage.getItem("Secret")
            const method = "GET"
            const url = "/myself"
            const body = JSON.stringify(userData)
            const stringToSign = `${method}${url}${body}${secret}`
            const response = await fetch(`${host_url}/myself`, {
                headers: {
                    Key:key,
                    Sign:CryptoJS.MD5(stringToSign).toString()
                }
            })
            if(response.status === 200){
                const data = await response.json()
                console.log(data);
                setEmail(data.email)
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("Key")
        localStorage.removeItem("Sign")
        localStorage.removeItem("Secret")
    }
  return (
    <div className="navbar-container">
        <div className="navbars">
            <h3>Email: {email}</h3>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar