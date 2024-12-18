
import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { AxiosInstance } from "../../config/AxiosInstance.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublicKey);


export const PaymentForm = ({ movieId, title, showDate, theatre, poster , city, time,seats = [] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");

  console.log("theatre===",theatre);
  console.log("posterr",poster);
  
  

  useEffect(() => {
    if (seats.length === 0) {
      setErrorMessage("No seats selected. Please select seats and try again.");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const response = await AxiosInstance.post("/payments/create-payment-intent", {
          amount: seats.length * 150,
        });
        setClientSecret(response.data.clientSecret);
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
    setErrorMessage("");

    try {
      let error;
      if (paymentMethod === "card") {
        ({ error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }));
      } else if (paymentMethod === "upi") {
        ({ error } = await stripe.confirmUpiPayment(clientSecret, {
          payment_method: {
            upi: { vpa: upiId },
          },
        }));
      }
      if (error) throw error;
      toast.success("Payment successful! Your booking is confirmed.");
      const [day, month, year] = showDate.split("/"); // Split into day, month, year
const formattedDate = `${year}-${month}-${day}`; // Convert to ISO format (YYYY-MM-DD)

const bookingDetails = {
  movieId,
  title,
  showDate: formattedDate, // Send corrected date format
  theatre,
  city,
  poster,
  showTime: time,
  seats,
  totalPrice: seats.length * 150,
};

      console.log("Booking details being sent:", bookingDetails);
      
     const response = await AxiosInstance.post("/booking/moviebooking", bookingDetails); // Save booking to backend

     console.log("response==",response);
     
      // Redirect to 'My Bookings' page
      setTimeout(() => {
        navigate("/user/my-bookings");
      }, 3000);
    } catch (error) {
      console.error("Payment failed:", error.message);
      setErrorMessage("Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Complete Payment for {title}</h2>
        <p className="text-sm text-gray-600 mb-2">Theatre: {theatre}, City: {city}</p>
        <p className="text-sm text-gray-600 mb-2">Date: {showDate}</p>
        <p className="text-sm text-gray-600 mb-2">Time: {time}</p>
        <p className="text-sm text-gray-600 mb-2">Seats: {seats.join(", ")}</p>
        <p className="text-lg font-bold mb-4">Total: ₹{seats.length * 150}</p>

        <div className="mb-4">
          <label className="text-gray-600">Choose Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="p-2 border rounded w-full mt-2"
          >
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>

        {paymentMethod === "card" && <CardElement className="p-2 border rounded mb-4" />}

        {paymentMethod === "upi" && (
          <input
            type="text"
            placeholder="Enter UPI VPA (e.g., yourname@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
          />
        )}

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <button
          type="submit"
          disabled={!stripe || !clientSecret || loading || (paymentMethod === "upi" && !upiId)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay with ${paymentMethod === "card" ? "Card" : "UPI"}`}
        </button>
      </form>
    </>
  );
};

export const Payment = () => {
  const location = useLocation();
  const { movieId, title, theatre, city, time, seats, showDate, poster } = location.state || {};
  const navigate = useNavigate();

  // Validate required state
  useEffect(() => {
    if (!movieId || !title || !seats || seats.length === 0) {
      toast.error("Invalid payment details. Redirecting to home...");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [movieId, title, seats, navigate]);

  const paymentPageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${poster || "/default-poster.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={paymentPageStyle}>
      <Elements stripe={stripePromise}>
        <PaymentForm
          movieId={movieId}
          title={title}
          showDate={showDate}
          theatre={theatre}
          city={city}
          time={time}
          seats={seats}
        />
      </Elements>
    </div>
  );
};
