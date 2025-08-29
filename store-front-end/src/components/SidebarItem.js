import Arrow from '../assets/menu-dropdown.svg'
import {useState} from "react"
import { UserAuth } from '../context/AuthContext.js'
import {useNavigate} from 'react-router-dom'
import { getAuth } from "firebase/auth";

export default function SidebarItem({item}){
    const [open, setOpen] = useState(false)
    const { logOut } = UserAuth(); 
    const navigate = useNavigate()

    const auth = getAuth(); 
    const user = auth.currentUser;

    //signs out user
    const handleSignOut = async()=>{
        try{
            await logOut()
            navigate('/')
            console.log(user)
        }
        catch(error){
            console.log(error)
        }
    }

    if(item.childrens){
        return(
        <div className = {open ? "sidebar-item open" : "sidebar-item"}>
            <div className = "sidebar-title">
                <span>
                    {item.title}
                </span>
                <img className = "toggle-btn" src = {Arrow} alt = "dropdown arrow" onClick = {() => setOpen(!open)}></img>
            </div>
            <div className = "sidebar-content">
                {item.childrens.map((child, index) => <SidebarItem key = {index} item = {child}/>)}
            </div>
        </div>
        )
    }
    else if(item.title === "ADD/EDIT PRODUCTS"){
        const auth = getAuth()
        const user = auth.currentUser
        if(user){
            if(user.email === "kisabellecortez@gmail.com" || user.email === "sarathingalaya@gmail.com"){
                return(
                    <a href = {item.path || '#'} className = "sidebar-item">
                        <div className = "sidebar-title">
                            <span>
                                {item.title}
                            </span>
                        </div>
                    </a>
                )
            }
        }
    }
    else if(item.title === "LOGOUT"){
        const auth = getAuth()
        const user = auth.currentUser
        
        if(user){
            return(
                <a href = {item.path || '#'} className = "sidebar-item">
                    <div className = "sidebar-title" onClick={(handleSignOut)}>
                        <span>
                            {item.title}
                        </span>
                    </div>
                </a>
            )
        }
    }
    else{
        return(
            <a href = {item.path || '#'} className = "sidebar-item">
                <div className = "sidebar-title">
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }

}