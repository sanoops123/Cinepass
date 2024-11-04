import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log("Stripe Publishable Key:", stripePublicKey);
const stripePromise = loadStripe(stripePublicKey);

export const PaymentForm = ({ movieId, title, showDate, theater, city, time, seats=[] }) => {


  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await AxiosInstance.post("/payments/create-payment-intent", {
          amount: seats.length * 150, // Assuming 150 per seat
        });
        setClientSecret(response.data.clientSecret);
        console.log("Client Secret:", response?.data?.clientSecret); // Log the client secret
      } catch (error) {
        console.error("Failed to create payment intent:", error);
        setErrorMessage("Failed to create payment intent. Please try again.");
      }
    };

    createPaymentIntent();
  }, [seats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(""); // Reset error message on new submission

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (error) {
      console.error("Payment failed:", error.message);
      setErrorMessage("Payment failed, please try againnn.");
    } else {
      alert("Payment successful! Your booking is confirmed.");
      // Optionally, redirect or perform additional actions on success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Complete Payment for {title}</h2>
      <p className="text-sm text-gray-600 mb-2">Theater: {theater}, City: {city}</p>
      <p className="text-sm text-gray-600 mb-2">Date: {showDate}</p> 
      <p className="text-sm text-gray-600 mb-2">Time: {time}</p>
      <p className="text-sm text-gray-600 mb-2">Seats: {seats.join(", ")}</p>
      <p className="text-lg font-bold mb-4">Total: ₹{seats.length * 150}</p>

      <CardElement className="p-2 border rounded mb-4" />

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} 

      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export const Payment = () => {
  const location = useLocation();
  const { movieId, title, theater, city, time, seats, showDate } = location.state || {}; // Ensure showDate is included

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Elements stripe={stripePromise}>
        <PaymentForm
          movieId={movieId}
          title={title}
          showDate={showDate} // Pass showDate to PaymentForm
          theater={theater}
          city={city}
          time={time}
          seats={seats}
        />
      </Elements>
    </div>
  );
};
    