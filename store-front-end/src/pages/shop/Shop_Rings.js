import React, { useState, useEffect, useContext } from 'react';

import Sidebar from '../../components/Sidebar.js';
import TopNav from '../../components/TopNav.js';
import EndBanner from '../../components/EndBanner.js';

/* MUI components */
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { productsArray } from '../../data/productData.js'
import { CartContext } from '../../context/CartContext.js'

import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function Shop_Rings(){
    const [ringsArray, setRingsArray] = useState([])
    const [imagesArray, setImagesArray] = useState([])

    const cart = useContext(CartContext); 
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [size, setSize] = useState('');
    const [selectedProductId, setSelectedProductId] = useState(null); 

    const handleClick = (message) => {
        setOpen(true);
        setMessage(message);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setMessage('');
    };

    const handleOpenForm = (id, type) => {
        setSelectedProductId(id)
        setSize(''); // reset size
        setOpenForm(true); // open form 
    };
    

    const handleCloseForm = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpenForm(false);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSize(value === "" ? "" : parseFloat(value)); // Handle empty case and convert to float otherwise
    };
    

    /* add product to cart */
    const handleAddToCart = async() => {
        console.log("size:" + size)
        if (selectedProductId && size) {
            cart.addItemToCart(selectedProductId, size);
            console.log(cart);
            handleClick("Added to Cart!");
            setOpenForm(false);
        } else {
            handleClick("Please select a size.");
        }
    };

    useEffect(() => {
        const filteredRings = productsArray.filter(product => product.properties === "ring") // filter products to only have rings
        setRingsArray(filteredRings)
    }, [])

    useEffect(() => {
        const fetchImages = async () => {
            const storage = getStorage();
            const urls = await Promise.all(
                ringsArray.map(async (product) => {
                    const url = await getDownloadURL(ref(storage, "products/" + product.id + ".jpg"));
                    return url;
                })
            );
            setImagesArray(urls);
        };
        fetchImages();
    }, [ringsArray]);

    return(
        <div>
            <Sidebar />
            <TopNav />

            <div className="pcard-section">
                {ringsArray.map((product, index) => (
                    <div key={product.id} className="pcard">
                        {imagesArray[index] ? (
                            <img src={imagesArray[index]} alt="Product" />
                        ) : (
                            <p>No image of product...</p>
                        )}
                        <h3 className="name">{product.name}</h3>
                        <p className="price">${product.price}</p>

                        <div>
                            <div className="button">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => handleOpenForm(product.id, product.properties)} // Pass the product id here
                                >
                                    Add to Cart
                                </Button>
                            </div>
                                <Dialog disableEscapeKeyDown open={openForm} onClose={handleCloseForm}>
                                    <DialogTitle>Ring Size</DialogTitle>
                                    <DialogContent>
                                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel htmlFor="demo-dialog-native">Size</InputLabel>
                                                <Select
                                                    native
                                                    value={size}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="Size" />}
                                                >
                                                    <option aria-label="None" value="" />
                                                    <option value={3}>3</option>
                                                    <option value={3.5}>3.5</option>
                                                    <option value={4}>4</option>
                                                    <option value={4.5}>4.5</option>
                                                    <option value={5}>5</option>
                                                    <option value={5.5}>5.5</option>
                                                    <option value={6}>6</option>
                                                    <option value={6.5}>6.5</option>
                                                    <option value={7}>7</option>
                                                    <option value={7.5}>7.5</option>
                                                    <option value={8}>8</option>
                                                    <option value={8.5}>8.5</option>
                                                    <option value={9}>9</option>
                                                    <option value={9.5}>9.5</option>
                                                    <option value={10}>10</option>
                                                    <option value={10.5}>10.5</option>
                                                    <option value={11}>11</option>
                                                    <option value={11.5}>11.5</option>
                                                    <option value={12}>12</option>
                                                    <option value={12.5}>12.5</option>
                                                    <option value={13}>13</option>
                                                    <option value={13.5}>13.5</option>
                                                    <option value={14}>14</option>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseForm}>Cancel</Button>
                                    <Button onClick={handleAddToCart}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                ))}
            </div>

            <div className="alert">
                <Snackbar
                    open={open}
                    autoHideDuration={2500}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </div>

            <EndBanner />
        </div>
    )
}