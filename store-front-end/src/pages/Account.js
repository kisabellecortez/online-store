import Sidebar from '../components/Sidebar.js'
import TopNav from '../components/TopNav.js'
import EndBanner from '../components/EndBanner.js';
import { useNavigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext.js'
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Account(){
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [passVisib, setPassVisib] = useState(false)
    const [password, setPassword] = useState('')

    const [activePage, setActivePage] = useState('accountDetails')

    const { updateName, logOut, updEmail, updatePass, deleteUser, getUserFirstName, getUserLastName } = UserAuth(); 

    useEffect(()=>{
        const initializeUser = async() => {
            const auth = getAuth()
            const user = auth.currentUser

            if(!user){
                navigate('/signin')
                return
            }

            setCurrUser(user)
            setEmail(user.email)

            const first = await getUserFirstName(user.uid)
            const last = await getUserLastName(user.uid)
            setFirstName(first || '')
            setLastName(last || '')
        }

        initializeUser()
    }, [])

    const handleLogOut = async() => {
        await logOut()
        navigate('/home')
    }

    /* delete user */
    const handleDelUser = async() => {
        await deleteUser(); 
        alert("Your account was successfully deleted.")
        navigate('/home')
    }

  return(
    <div>
        <Sidebar/>
        <TopNav/>

        <div className="account-page">

                <div className="account-title">
                    <h1>Welcome Back, {firstName}!</h1>
                </div>

            <div className="account-parent">
                <div className="account-menu">
                    <Button className="account-button"onClick={() => setActivePage('accountDetails')}>
                        <ManageAccountsIcon/>
                        <p>Account Details</p>
                    </Button>
                    <Button className="account-button" onClick={() => setActivePage('orders')}>
                        <LocalShippingIcon/>
                        <p>My Orders</p>
                    </Button>
                    <Button className="account-button" onClick={() => navigate('/shoppingcart')}>
                        <ShoppingCartIcon/>
                        <p>Cart</p>
                    </Button>
                    
                    <hr className="line"></hr>

                    <Button className="account-button" onClick={() => handleLogOut()}>
                        <LogoutIcon/>
                        <p>Log Out</p>
                    </Button>
                </div>

                {activePage === 'accountDetails' && (
                    <div className="account-sub-page">
                        <div className="account-details">
                            <div className="account-input">
                                <TextField
                                    className="account-input"
                                    label="First Name"
                                    variant="outlined"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="account-input">
                                <TextField
                                    className="account-input"
                                    label="Last Name"
                                    variant="outlined"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="account-input">
                                <TextField
                                    className="account-input"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="account-input">
                            <Button className="account-button" onClick={() => updateName(firstName, lastName)}>
                                <p>Save Changes</p>
                            </Button>
                        </div>

                        <div className="account-input" onClick={() => updatePass(currUser.email)}>
                            <Button className="password-button">
                                <p>Send Password Reset Email</p>
                            </Button>
                        </div> 

                        <div className="button-input">
                            <Button className="delete-button" onClick={() => handleDelUser()}>
                                <p>Delete Account</p>
                            </Button>
                        </div>  
                    </div>
                )}

                {activePage === 'orders' && (
                    <div className="account-sub-page">
                        <div className="order-card">
                            <p>hello cat</p>
                        </div>
                    </div>
                )}

            </div>

        </div>

        <EndBanner/> 
    </div>

  )

}