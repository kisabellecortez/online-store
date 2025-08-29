import {useState} from "react"

import SidebarItem from './SidebarItem'
import items from "../data/sidebar.json"

import Open from '../assets/menu.svg'
import Close from '../assets/menu-x.svg'

export default function Sidebar(){
    const [open, setOpen] = useState(false)
   
    return(
        <div className = {open ? "menu open" : "menu"}>
            <div className = "btn-container">
                    <div className = "btn-card">
                        <div className = "open-btn">
                            <img className = "menu-btn" src = {Open} alt = "open menu button" onClick = {() => setOpen(!open)}></img>
                        </div>
                        <div className = "close-btn">
                            <img className = "menu-btn" src = {Close} alt = "close menu button" onClick = {() => setOpen(!open)}></img>
                        </div>
                    </div>
                </div>
            
            <div className = "sidebar">
                
                {items.map((item, index) => <SidebarItem key = {index} item = {item}/>)}
            </div>
            
        </div>

    )
}