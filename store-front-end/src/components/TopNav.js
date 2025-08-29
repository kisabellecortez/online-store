import Logo from '../assets/logo.png'
import Name from '../assets/logo-name.png'
import Cart from '../assets/cart.svg'
import User from '../assets/user.svg'

export default function TopNav(){
    return(
        <div className = "nav">
            <img className = "logo" src = {Logo} alt = "Nirvana Collections logo"></img>
            <img className = "name" src = {Name} alt = "Nirvana Collections"></img>
        

            <a href="/account" className="user-shop">
                <img src={User} alt="user icon"></img>
            </a>
            <a href="/shoppingcart" className="user-shop">
                <img src={Cart} alt="shopping cart"></img>
            </a>

        </div>
        
    )
}