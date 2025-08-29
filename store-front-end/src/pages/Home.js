import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js'

import h1 from '../assets/header-1.png'
import necklaces from '../assets/necklaces.jpg'
import bracelets from '../assets/bracelets.webp'
import crystals from '../assets/crystals.webp'
import rings from '../assets/rings.webp'
import charms from '../assets/charms.webp'

export default function Home(){
    
    return(
        <div className="page">
            <Sidebar/>
            <TopNav/>

            <div className="header">
                <img src={h1} alt="crystal jewelry"></img>
            </div>

            <div className="collage-parent">
                <div className="collage-child">
                    <a href="/">
                        <img src={bracelets} alt="jewelry"></img>
                    </a>

                    <a href="/">
                        <img src={necklaces} alt="jewelry"></img>
                    </a>

                    <a href="/shop/rings">
                        <img src={rings} alt="jewelry"></img>
                    </a>
                    
                    <a href="/shop/crystals">
                        <img src={crystals} alt="jewelry"></img>
                    </a>

                    <a href="/">
                        <img src={charms} alt="jewelry"></img>
                    </a>
                </div>
            </div>

            <EndBanner/>
        </div>
    )
}