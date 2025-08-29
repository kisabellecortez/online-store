import React, { useState } from 'react';  
import { UserAuth } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import arrow from '../assets/arrow.svg'

/* Material UI */ 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SignIn =()=> {
  const { signIn } = UserAuth(); 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  //sign in users using email and password
  const handleSignIn = async(e)=>{
    e.preventDefault()   
 
    try{
        await signIn(email, password)
        navigate('/home')
    }
    catch(userCredential){
        console.log("Invalid email or password.")

        return(
          alert("Email or password is incorrect.")
        )
    }
  
  }

    return(
      <div className="sign-in">
        <div className="return">
          <img src={arrow} alt="arrow"></img>
          <a href="/home">RETURN TO SHOPPING</a>
        </div>
        <div className="sign-in-card">
          <h1>Welcome back!</h1>

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
              </Box>

              <Button variant="contained" color="secondary" size="large" onClick={handleSignIn}>SIGN IN</Button>
            </div>
            

            <p>Don't have an account? Sign up <a href="/signup">here.</a></p>

            <p><a className="home-portal" href="/home">Continue as guest?</a></p>
          </div> 
      </div>
    );
};

export default SignIn; 