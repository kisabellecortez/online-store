import Insta from '../assets/instagram.png'
import Tiktok from '../assets/tiktok.png'

export default function EndBanner(){
    return(
        <div className="end-banner">
            <div className="support">
                <h1>SUPPORT</h1>
                <a href="/contact-us">Contact Us</a>
                <a href = "/">FAQs</a>
                <a href = "/">Jewelry Care</a>
                <a href = "/">Ring Size Guide</a>
            </div>
            <div className = "more">
                <h1>MORE</h1>
                    <a href = "/">About</a>
                    <a href = "/">Blog</a>
                    <a href = "/">Custom Orders</a>
            </div>

            <div className = "payments">

            </div>

            <div className = "socials">
                <a href = "https://www.instagram.com/nirvanacollectinc/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==">
                    <img className = "insta" src = {Insta} alt = "Instagram logo"></img>
                </a>
                <a href = "https://l.instagram.com/?u=https%3A%2F%2Fwww.tiktok.com%2F%40nirvanacollections%3F_t%3D8hv7gbADOT8%26_r%3D1&e=AT2TiNGlXAhKdyW5TV5zUk3pTd-c2Nk9lL5lf1bqopU5gaZJCpUOvTXflzOl8jjfhvznt-vYspB7vcpTpILLT4mV2vI8_gNR8xvu9kxoOC0Gbi-_WiZjzvW2fTmD-bOzldgkf_I">
                    <img className = "tiktok" src = {Tiktok} alt = "Tiktok logo"></img>
                </a>
            </div>
        </div>
    )
}