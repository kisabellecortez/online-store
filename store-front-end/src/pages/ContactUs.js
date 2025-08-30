import React, { useRef } from 'react'
import emailjs from 'emailjs-com'
import Sidebar from '../components/Sidebar.js';
import TopNav from '../components/TopNav.js';
import EndBanner from '../components/EndBanner.js';

export default function ContactUs(){
    const formRef = useRef(); 

    const sendEmail =(e) => {
        e.preventDefault(); 

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log("Email sent: ", result.text);
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.error(error.text); 
                    alert("Failed to send message.");
                }
            )
    }

    return(
        <div>
            <TopNav/>
            <Sidebar/>

            <div className="contact">
                <h1>Contact Us</h1>
                <form ref={formRef} onSubmit={sendEmail}>
                    <input 
                        type="text"
                        name="title"
                        placeholder="Subject"
                        required/>

                    <input
                        type="text"
                        name="from_name"
                        placeholder="Your Name"
                        required/>  

                    <input
                        type="email"
                        name="reply_to"
                        placeholder="Email"
                        required />
                    
                    <textarea
                        name="message"
                        placeholder="Write Your Message Here"
                        required />

                    <button type="submit" className="contact-btn">SEND</button>
                </form>
            </div>

            <EndBanner/>
        </div>
    )
}