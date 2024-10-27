import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-8 bottom-0 w-full ">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-500">Home</a></li>
            <li><a href="/movies" className="hover:text-yellow-500">Movies</a></li>
            <li><a href="/events" className="hover:text-yellow-500">Events</a></li>
            <li><a href="/contact" className="hover:text-yellow-500">Contact Us</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-lg font-bold mb-4">Customer Support</h2>
          <ul className="space-y-2">
            <li><a href="/faq" className="hover:text-yellow-500">FAQ</a></li>
            <li><a href="/support" className="hover:text-yellow-500">Support</a></li>
            <li><a href="/privacy-policy" className="hover:text-yellow-500">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-yellow-500">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        <p>&copy; 2024 Cinepass. All rights reserved.</p>
      </div>
    </footer>
  );
};


