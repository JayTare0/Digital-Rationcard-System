
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Footer: React.FC = () => {
  const { t } = useAppContext();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center text-white mb-6">
            <i className="fas fa-id-card text-blue-500 text-3xl mr-2"></i>
            <span className="text-xl font-bold">DRC Portal</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            The Digital Ration Card System is a flagship initiative of the Department of Food and Public Distribution to ensure food security for all citizens.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <i className="fab fa-facebook-f text-sm"></i>
            </a>
            <a href="#" className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
              <i className="fab fa-twitter text-sm"></i>
            </a>
            <a href="#" className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <i className="fab fa-youtube text-sm"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About the Scheme</Link></li>
            <li><Link to="/apply" className="hover:text-white transition-colors">Apply New Card</Link></li>
            <li><Link to="/status" className="hover:text-white transition-colors">Track Application</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Help & Support</Link></li>
            <li><Link to="/news" className="hover:text-white transition-colors">Latest News</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">User Manual (PDF)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Eligibility Criteria</a></li>
            <li><a href="#" className="hover:text-white transition-colors">List of Documents</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fair Price Shops</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Support</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <i className="fas fa-phone-alt mt-1 mr-3 text-blue-500"></i>
              <span>Toll Free: 1800-11-4556</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-envelope mt-1 mr-3 text-blue-500"></i>
              <span>support@drc.gov.in</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-500"></i>
              <span>Ministry of Consumer Affairs, Food & Public Distribution, New Delhi.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Digital Ration Card Management System. All Rights Reserved.</p>
        <p className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Accessibility Statement</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
