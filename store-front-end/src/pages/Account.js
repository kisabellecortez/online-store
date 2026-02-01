import Sidebar from '../components/Sidebar.js';
import TopNav from '../components/TopNav.js';
import EndBanner from '../components/EndBanner.js';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext.js';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Account() {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [activePage, setActivePage] = useState('accountDetails');

export default function Account(){
    const navigate = useNavigate()
    const [currUser, setCurrUser] = useState('')
    const [name, setName] = useState('')

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [passVisib, setPassVisib] = useState(false)
    const [password, setPassword] = useState('')

    const [activePage, setActivePage] = useState('accountDetails')

    const { setDispName, updateEmail, updatePass, deleteUser, getUserFirstName, getUserLastName } = UserAuth(); // AuthContext functions using Firebase

            if (!user) {
                navigate('/signin');
                return;
            }

            setCurrUser(user);
            setEmail(user.email);

        if(user){
            setCurrUser(user)
            setEmail(user.email)
            setPassword(user.password)
        }
        else{
            navigate('/signin')
        }
    }

    useEffect(()=>{
        checkUser()

        const fetchFirstName = async() => {
            if(currUser?.uid){
                const firstName = await getUserFirstName(currUser.uid)
                setFirstName(firstName)
            }
        }

        const fetchLastName = async() => {
            if(currUser?.uid){
                const lastName = await getUserLastName(currUser.uid)
                setLastName(lastName)
            }
        }

        fetchFirstName()
        fetchLastName()
    }, [currUser])

    /* sends password reset email */
    const handleChangePass = async() => {
        await updatePass(currUser.email)
        alert("A password change email was send to " + currUser.email + "!")
    }

    /* delete user */
    const handleDelUser = async() => {
        await deleteUser(); 
        alert("Your account was successfully deleted.")
        navigate('/home')
    }

    const handleChanges = async() => {
        await updateEmail(email)
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
                        <Button className="account-button" onClick={() => setActivePage('accountDetails')}>
                            <ManageAccountsIcon />
                            <p>Account Details</p>
                        </Button>
                        <Button className="account-button" onClick={() => setActivePage('orders')}>
                            <LocalShippingIcon />
                            <p>My Orders</p>
                        </Button>
                        <Button className="account-button" onClick={() => navigate('/shoppingcart')}>
                            <ShoppingCartIcon />
                            <p>Cart</p>
                        </Button>

                        <hr className="line" />

                        <Button className="account-button" onClick={handleLogOut}>
                            <LogoutIcon />
                            <p>Log Out</p>
                        </Button>
                    </div>

                    {activePage === 'accountDetails' && (
                        <div className="account-sub-page">
                            <div className="account-details">
                                <div className="account-input">
                                    <TextField
                                        label="First Name"
                                        variant="outlined"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="account-input">
                                    <TextField
                                        label="Last Name"
                                        variant="outlined"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="account-input">
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="account-input">
                                <Button className="account-button" onClick={() => updateName(firstName, lastName)}>
                                    <p>Save Changes</p>
                                </Button>
                            </div>

                            <div className="account-input">
                                <Button className="password-button" onClick={() => updatePass(currUser.email)}>
                                    <p>Send Password Reset Email</p>
                                </Button>
                            </div>

                            <div className="button-input">
                                <Button className="delete-button" onClick={handleDelUser}>
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
                                />
                            </div>
                        </div>

                        <div className="account-input">
                            <Button className="account-button" onClick={() => handleChanges()}>
                                <p>Save Changes</p>
                            </Button>
                        </div>

                        <div className="account-input">
                            <Button className="password-button" onClick={() => handleDelUser()}>
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

            <EndBanner />
        </div>
    );
}
