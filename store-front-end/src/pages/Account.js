import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js';
import { useNavigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react'

import { UserAuth } from '../context/AuthContext.js'

import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Account(){
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState('')
    const [name, setName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const { setDispName, updateEmail, updatePass, delUser } = UserAuth(); // AuthContext functions using Firebase

    /* checks if user is signed in */
    const checkUser = async() => {
        const auth = getAuth()
        const user = auth.currentUser

        console.log(user)

        if(user){
            setCurrUser(user)
            navigate('/account') // goes to user's account page if signed in 
        }
        else{
            navigate('/signin') // goes to sign in page if user is not signed in 
        }
    }

    useEffect(()=>{
        checkUser()
    })

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /* change email */
    const handleChangeEmail = async() => {
        await updateEmail(newEmail)
        alert("Your email was successfully changed!")
    }

    /* sends password reset email */
    const handleChangePass = async() => {
        await updatePass(currUser.email)
        alert("A password change email was send to " + currUser.email + "!")
    }

    /* delete user */
    const handleDelUser = async() => {
        handleClose()
        await delUser(); 
        alert("Your account was successfully deleted.")
        navigate('/home')
    }

    /* set user display name */
    const handleSetName = async() => {
        await setDispName(name) // calls display name function for Firebase
    }

  return(
    <div>
        <Sidebar/>
        <TopNav/>

        <h1 className="page-title">Your Account</h1>

        <div className="account">
            <div className="account-nav">
                <Button size="large" variant="outlined">Purchases </Button>
                <Button size="large" variant="outlined" >Settings</Button>
            </div>

            <div className="account-pages">
                <div className="account-purchases">

                </div>
                <div className="account-settings">
                    {currUser.displayName === null ? (
                        <div>
                            <Box
                                component="form"
                                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField 
                                    id="standard-basic" label="Enter your Name" variant="standard" 
                                    value={name} 
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </Box>

                            <Button variant="contained" color="secondary" onClick={handleSetName}>Set Name</Button>
                        </div>
                    ) : (
                        <h2> Welcome back {currUser.displayName}</h2>
                    )}

                    <p>Email: {currUser.email}</p>

                    <form onSubmit={handleChangeEmail}>
                        <TextField 
                            id="standard-basic" 
                            label="New Email" 
                            variant="standard" 
                            type="email"
                            value={newEmail}
                            onChange={(e)=>setNewEmail(e.target.value)} />

                        <Button variant="outlined" color="error" type="submit">
                            Change Email
                        </Button>
                    </form>

                    <Button variant="outlined" color="error" onClick={handleChangePass}>
                        Change Password
                    </Button>

                    <React.Fragment>
                        <Button variant="outlined" color="error" onClick={handleClickOpen}>
                            Delete Account
                        </Button>
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"Do you want to Delete your Account?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Are you sure you want to delete your account? All information on your past purchases will be deleted.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>No</Button>
                            <Button onClick={handleDelUser}>Yes</Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                </div>
            </div>
        </div>

        <EndBanner/> 
    </div>

  )

}