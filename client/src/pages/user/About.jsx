import React from 'react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About CineTickets</h1>
          <p className="text-gray-700 text-lg mb-4">
            Welcome to <span className="font-semibold text-blue-600">CineTickets</span>, your one-stop destination for an effortless and enjoyable movie ticket booking experience. At CineTickets, we believe that cinema is more than just entertainment—it&apos;s an experience that brings stories to life, creates memories, and unites people. 
            Our mission is to make your movie-going journey as seamless and exciting as the movies you love to watch.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Wide range of movies: Explore the latest blockbusters and timeless classics.</li>
            <li>User-friendly booking: Enjoy real-time seat availability and instant confirmations.</li>
            <li>Secure payments: Advanced payment gateways ensure safe transactions.</li>
            <li>Personalized recommendations: Discover movies tailored to your preferences.</li>
            <li>Flexible options: Choose your favorite theaters, showtimes, and seating arrangements.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-gray-700 text-lg mb-6">
            At CineTickets, we are committed to enhancing your movie experience by providing:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li><span className="font-semibold">Convenience</span>: Book your tickets from anywhere, anytime.</li>
            <li><span className="font-semibold">Transparency</span>: No hidden charges—what you see is what you pay.</li>
            <li><span className="font-semibold">Customer Support</span>: Our dedicated support team is here for you.</li>
            <li><span className="font-semibold">Reliability</span>: Trusted theater partnerships for a smooth booking experience.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg mb-6">
            We aim to revolutionize the way you experience movies by blending cutting-edge technology with a passion for cinema. CineTickets aspires to be more than just a booking platform—it&apos;s a gateway to countless adventures, emotions, and unforgettable moments.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join the CineTickets Community</h2>
          <p className="text-gray-700 text-lg mb-6">
            Whether you&apos;re a die-hard movie enthusiast or someone planning a casual outing, CineTickets brings the magic of movies closer to you. Stay updated with the latest releases, exclusive offers, and more by joining our growing community of movie lovers.
          </p>

          <div className="text-center">
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg">
              Start Booking Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


