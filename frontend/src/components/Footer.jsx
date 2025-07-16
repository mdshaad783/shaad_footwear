import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 border border-gray-700 py-10">
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-700">About WWT</h2>
          <p className="text-sm">
            WalkWithTrend is your go-to destination for trendy and comfortable footwear, blending fashion with function.
          </p>
        </div>

        {/* Links */}
        <div className='md:pl-8 lg:pl-12'>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link to="/shop" className="hover:text-blue-500">Shop</Link></li>
            <li><Link to="#" className="hover:text-blue-500">Contact</Link></li>
            <li><Link to="#" className="hover:text-blue-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className='md:pl-8 lg:pl-12'>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Contact Us</h2>
          <p>Email: support@walkwithtrend.com</p>
          <p>Phone: +91-9334342004</p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()}{' '}
            <Link to="/" className="text-blue-500 font-semibold hover:underline">WalkWithTrend &</Link>&nbsp; 
            <a href="https://mdshaad-portfolio.vercel.app" target='blank' className="text-blue-500 font-semibold hover:underline">mdshaad783</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
