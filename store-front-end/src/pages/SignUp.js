import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'

/* Material UI */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import arrow from '../assets/arrow.svg'

const SignUp =()=>{
    const navigate = useNavigate(); 
    const { createUser } = UserAuth()

    //user information
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordC, setPasswordC] = useState('')

    //create new users
    const handleSignUp = async()=>{
        try{
            // confirm password 
            if(password === passwordC){
                await createUser(email, password); 
                navigate('/home')
                
            }
            else{
                return(
                    alert("Passwords do not match.")
                )
            }
       
        }
        catch(error){
            alert(error)
        }
    }

    return(
        <div className="sign-in">
            <div className="return">
                <img src={arrow} alt="arrow"></img>
                <a href="/home">RETURN TO SHOPPING</a>
            </div>
    
            <div className="sign-in-card">
                <h1>Welcome!</h1>

                <div className="form">
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                        required
                        id="email"
                        label="EMAIL"
                        type='email' 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        />

                        <TextField
                        required
                        id="password"
                        label="PASSWORD"
                        type='password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />

                        <TextField
                        required
                        id="password"
                        label="CONFIRM PASSWORD"
                        type='password' 
                        value={passwordC}
                        onChange={(e)=>setPasswordC(e.target.value)}
                        />
                    </Box>

                    <Button variant="contained" color="secondary" size="large" onClick={handleSignUp}>SIGN UP</Button>
                </div>

                <p>Already have an account? Sign In <a href="/signin">here.</a></p>

                <p><a className="home-portal" href="/home">Continue as guest?</a></p>
            </div>
        </div>
    )
}

export default SignUp