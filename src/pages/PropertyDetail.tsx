import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Heart, Bed, Bath, Square, MapPin,
  Phone, Mail, Share2, Check, Calendar, Car, Dumbbell,
  Wifi, Waves, TreePine, Shield, Coffee, Dog, Home
} from 'lucide-react';
import { properties } from '../data/properties';

const featureIcons: Record<string, React.ElementType> = {
  'Fitness Center': Dumbbell,
  '24h Concierge': Shield,
  'Laundry In-Unit': Check,
  'Parking Available': Car,
  'Pet Friendly': Dog,
  'Ocean View': Waves,
  'Infinity Pool': Waves,
  'Beach Access': Waves,
  'Valet Parking': Car,
  'Gym': Dumbbell,
  'Storage Unit': Check,
  'All Utilities Included': Check,
  'High-Speed Internet': Wifi,
  'Near Campus': MapPin,
  'Laundry On-Site': Check,
  'Bike Storage': Check,
  'Study Lounge': Coffee,
  'Large Backyard': TreePine,
  '2-Car Garage': Car,
  'Finished Basement': Home,
  'Central AC': Check,
  'Security System': Shield,
  'Near Schools': MapPin,
  'High Ceilings': Home,
  'Natural Light': Check,
  'Freight Elevator': Check,
  'Roof Deck Access': Home,
  'Artist Community': Coffee,
  '360° Views': Home,
  'Private Terrace': Home,
  'Wine Cellar': Coffee,
  'Smart Home': Wifi,
  'Doorman': Shield,
  'Private Spa': Waves,
  'Period Details': Home,
  'Bay Windows': Home,
  'Garden Access': TreePine,
  'Storage': Check,
  'Historic Building': Home,
  'Co-Working Space': Coffee,
  'Podcast Studios': Coffee,
  'Rooftop Lounge': Home,
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(properties.find(p => p.id === Number(id)));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFavorite = () => {
    if (!property) return;
    const newFavorites = favorites.includes(property.id)
      ? favorites.filter(f => f !== property.id)
      : [...favorites, property.id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! The agent will contact you shortly.');
    setIsContactModalOpen(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/listings" className="text-blue-600 hover:text-blue-700">
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/listings" className="inline-flex items-center text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
            />

            {/* Image Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={toggleFavorite}
                className={`p-3 rounded-full transition-colors ${
                  favorites.includes(property.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 bg-white/90 rounded-full text-gray-600 hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index ? 'border-white' : 'border-transparent'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{property.address}, {property.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                    <span className="text-sm text-gray-500 font-normal">/mo</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <Bed className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">
                    {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bedrooms`}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <Bath className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <Square className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">{property.sqft.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-700">Available Now</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature) => {
                  const Icon = featureIcons[feature] || Check;
                  return (
                    <div key={feature} className="flex items-center">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Map view coming soon</p>
                  <p className="text-sm">{property.address}, {property.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center mb-6">
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{property.agent.name}</h3>
                  <p className="text-gray-500 text-sm">Listing Agent</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  {property.agent.email}
                </a>
              </div>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
              >
                Contact Agent
              </button>
              <button
                onClick={toggleFavorite}
                className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                  favorites.includes(property.id)
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
                {favorites.includes(property.id) ? 'Saved to Favorites' : 'Save to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Agent</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder={`I'm interested in ${property.title}...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
