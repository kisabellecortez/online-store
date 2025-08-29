import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '20px',
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const response = await fetch('http://localhost:4242/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret, error: backendError } = await response.json();

    if (backendError) {
      setError(backendError);
      setProcessing(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardNumberElement,
    billing_details: {
        // add billing details here if available
    },
    });

    if (paymentMethodError) {
    setError(paymentMethodError.message);
    setProcessing(false);
    return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id,
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message);
      setProcessing(false);
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      setSuccess(true);
      setError(null);
      setProcessing(false);
      // Optionally redirect or clear cart here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <p>
            Card Number *
            <div className="payment-child">
                <CardNumberElement options={cardElementOptions}/>
            </div>
        </p>
        
        <p>
            Expiration *
            <div className="payment-child">
                <CardExpiryElement options={cardElementOptions}/>
            </div>
        </p>

        <p>
            Security Code *
            <div className="payment-child">
                <CardCvcElement options={cardElementOptions}/>
            </div>
        </p>
        
        <div className="button-parent">
          <button type="submit" disabled={!stripe || processing}>
            {processing ? 'Processing...' : `PLACE ORDER`}
          </button>
        </div>
  
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '10px' }}>Payment successful!</div>}
    </form>
  );
}
