// PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance.jsx';

export const PaymentSuccess = () => {
  const location = useLocation();
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');

    const fetchSessionStatus = async () => {
      try {
        const response = await AxiosInstance.get(`/payments/session-status?session_id=${sessionId}`);
        setStatus(response.data.status);
        setEmail(response.data.customer_email);
      } catch (error) {
        console.error("Error fetching session status:", error);
        setStatus("error");
      }
    };

    if (sessionId) fetchSessionStatus();
  }, [location]);

  return (
    <div className="payment-status flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full text-center">
        {status === 'succeeded' ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Payment Successful!</h2>
            <p>Confirmation sent to {email}</p>
          </>
        ) : status === 'error' ? (
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Payment Failed</h2>
        ) : (
          <h2 className="text-2xl font-semibold mb-4">Processing Payment...</h2>
        )}
      </div>
    </div>
  );
};


