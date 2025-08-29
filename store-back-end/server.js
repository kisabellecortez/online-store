require("dotenv").config()

const express = require('express');
const Stripe = require('stripe'); 
const cors = require('cors'); 

const app = express(); 
const port = process.env.PORT || 4242; 

const stripe = new Stripe(process.env.STRIPE_SK);   

app.use(cors({
    origin: 'http://localhost:3000'
}));

// 'https://onlinestore-website.netlify.app'
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ error: 'Missing amount.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
        amount, 
        currency: 'cad',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('Stripe error:', err);
        res.status(500).json({ error: 'Payment Intent creation failed.' });
    }
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});