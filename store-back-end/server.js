const express = require('express');
const Stripe = require('stripe'); 
const cors = require('cors'); 

const app = express(); 
const port = 4242; 

const databaseUrl = process.env.STRIPE_SK;
const stripe = new Stripe(databaseUrl);   

app.use(cors());
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