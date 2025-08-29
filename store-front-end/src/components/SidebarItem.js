import { useState } from 'react'

import Arrow from '../assets/menu-dropdown.svg'

export default function SidebarItem({item}){
    const [open, setOpen] = useState(false); 
    
    if(item.childrens){
        return(
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        {item.title}
                    </span>
                    <img className="toggle-btn" src={Arrow} alt="Dropdown arrow." onClick={() => setOpen(!open)}></img>
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => <SidebarItem key={index} item={child}/>)}
                </div>
            </div>
        )
    }
    else if(item.title === "LOGOUT"){
        // logout 
    }
    else{
        return(
            <a href={item.path || '#'} className="sidebar-item">
                <div className="sidebar-title">
                    <span>
                        {item.title}
                    </span>
                </div>
            </a>
        )
    }
}