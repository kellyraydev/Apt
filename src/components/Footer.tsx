import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">PrimeRentals</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect home. We connect quality tenants with exceptional properties across the nation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-white transition-colors">Browse Listings</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">Saved Properties</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings?city=New+York" className="text-gray-400 hover:text-white transition-colors">New York</Link>
              </li>
              <li>
                <Link to="/listings?city=Miami" className="text-gray-400 hover:text-white transition-colors">Miami</Link>
              </li>
              <li>
                <Link to="/listings?city=Los+Angeles" className="text-gray-400 hover:text-white transition-colors">Los Angeles</Link>
              </li>
              <li>
                <Link to="/listings?city=Chicago" className="text-gray-400 hover:text-white transition-colors">Chicago</Link>
              </li>
              <li>
                <Link to="/listings?city=Seattle" className="text-gray-400 hover:text-white transition-colors">Seattle</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-400">123 Real Estate Ave, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">(202) 571-6325</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@primerentals.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} PrimeRentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
