import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.VITE_STRIPE_Secret_Key) ; // Replace with your actual Stripe secret key


router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount,"==amount");
    

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to the smallest currency unit (e.g., paise for INR)
      currency: "inr",
    });
    
    

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export { router as paymentRoute };
