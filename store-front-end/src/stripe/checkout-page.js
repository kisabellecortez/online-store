import React, { useContext, useEffect, useState } from 'react'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { CartContext } from "../context/CartContext";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkout-form';

const stripePromise = loadStripe("process.env.REACT_APP_STRIPE_PK")

export default function CheckoutPage(){
    const cart = useContext(CartContext);
    const [imageUrls, setImageUrls] = useState({});
    const [delivery, setDelivery] = useState('Standard')

    useEffect(() => {
        console.log("Current cart items:", cart.items);
    }, [cart.items]);
    
    useEffect(() => {
        const storage = getStorage(); 

        const fetchImageUrls = async() => {
            const urls = {}; 
            for(const item of cart.items){
                try{
                    const imageRef = ref(storage, `products/${item.id}.jpg`); 
                    const url = await getDownloadURL(imageRef); 
                    urls[item.id] = url; 
                }
                catch(error){
                    console.error("Error: ", error);
                    urls[item.id] = ""; 
                }
            }

            setImageUrls(urls);
        }

        if(cart.items.length > 0){
            fetchImageUrls(); 
        }
    }, [cart.items]);

    const handleChange = (e) => {
        setDelivery(e.target.value);
    };

    const subtotal = cart.getTotalCost();
    const tax = cart.getTotalCost()*0.13; 
    const deliveryFee = delivery === 'Express' ? 40 : 0; 
    const total = subtotal + tax + deliveryFee;

    return(
        <div className="checkout-page">
            <div className="vert-div">
                <div className="shipping-parent">
                    <div className="title">
                        <h1>SHIPPING</h1>
                    </div>

                    <div className="form">
                        <div className="form-row">
                            <label>
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="Standard"
                                    checked={delivery === 'Standard'}
                                    onChange={handleChange}></input>
                                
                                Standard
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="delivery"
                                    value="Express"
                                    checked={delivery === 'Express'}
                                    onChange={handleChange}></input>
                                
                                Express
                            </label>
                        </div>
                    </div>
                </div>
                
                <div className="billing-parent">
                    <div className="title">
                        <h1>BILLING</h1>
                    </div>
                    <div className="payment-parent">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm amount={Math.round(total*100)}></CheckoutForm>
                        </Elements>
                    </div>
                </div>
            </div>

            <div className="side-div">
                <div className="summary-parent">
                    <div className="title">
                        <h1>SUMMARY</h1>
                    </div>

                    <div className="summary-child">
                        <div className="text-row">
                            <p>Subtotal</p>
                            <p>CAD {subtotal.toFixed(2)}</p>
                        </div>

                        <div className="text-row">
                            <p>Tax</p>
                            <p>CAD {tax.toFixed(2)}</p>
                        </div>

                        <div className="text-row">
                            <p>Delivery Fee</p>
                            {delivery === 'Standard' ? (
                                <p>FREE</p>
                            ) : (
                                <p>CAD {deliveryFee.toFixed(2)}</p>
                            )}
                        </div>

                        <div className="text-row">
                            <p>Total</p>
                            <p>CAD {total.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="cart-parent">
                    <div className="title">
                        <h1>YOUR CART</h1>
                    </div>
                    
                    {cart.items.map((item) => (
                        <div key={item.id} className="item-parent">
                            <div className="item-image">
                                <img
                                src={imageUrls[item.id]}
                                alt={item.name}
                                style={{ width: '150px', height: 'auto' }}
                                />
                            </div>
                            <div className="item.child">
                                <div className="item-name">
                                    <p>{item.name}</p>
                                </div>

                                {item.type === 'ring' ? (
                                    <p>Size {item.size}</p>
                                ) : (
                                    <p></p>
                                )}
                                <p>Qty {item.quantity}</p>
                                
                                <div className="item-price">
                                    <p className="item-price">CAD {item.price.toFixed(2)}</p>   
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};