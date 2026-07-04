import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft, Save, Plus, Trash2, Image, AlertCircle, CheckCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface PropertyFormData {
  title: string;
  address: string;
  city: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  description: string;
  features: string[];
  images: string[];
  agent_name: string;
  agent_phone: string;
  agent_email: string;
  agent_photo: string;
  is_featured: boolean;
  available: boolean;
}

const FEATURE_OPTIONS = [
  'Rooftop Lounge', 'Fitness Center', '24h Concierge', 'Laundry In-Unit',
  'Parking Available', 'Pet Friendly', 'Ocean View', 'Infinity Pool',
  'Beach Access', 'Valet Parking', 'Gym', 'Storage Unit', 'All Utilities Included',
  'High-Speed Internet', 'Near Campus', 'Laundry On-Site', 'Bike Storage',
  'Study Lounge', 'Large Backyard', '2-Car Garage', 'Finished Basement',
  'Central AC', 'Security System', 'Near Schools', 'High Ceilings', 'Natural Light',
  'Freight Elevator', 'Roof Deck Access', 'Artist Community', '360 Views',
  'Private Terrace', 'Wine Cellar', 'Smart Home', 'Doorman', 'Private Spa',
  'Period Details', 'Bay Windows', 'Garden Access', 'Storage', 'Historic Building',
  'Co-Working Space', 'Podcast Studios'
];

const CITIES = [
  'New York', 'Miami', 'Boston', 'Chicago', 'Los Angeles', 'Seattle', 'San Francisco', 'Austin'
];

export default function PropertyForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = id && id !== 'new';
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');

  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    address: '',
    city: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    description: '',
    features: [],
    images: [],
    agent_name: '',
    agent_phone: '',
    agent_email: '',
    agent_photo: '',
    is_featured: false,
    available: true,
  });

  useEffect(() => {
    if (!isAdmin) return;
    if (isEditing) {
      fetchProperty();
    }
  }, [isAdmin, isEditing, id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: data.title || '',
        address: data.address || '',
        city: data.city || '',
        price: data.price?.toString() || '',
        bedrooms: data.bedrooms?.toString() || '',
        bathrooms: data.bathrooms?.toString() || '',
        sqft: data.sqft?.toString() || '',
        description: data.description || '',
        features: data.features || [],
        images: data.images || [],
        agent_name: data.agent_name || '',
        agent_phone: data.agent_phone || '',
        agent_email: data.agent_email || '',
        agent_photo: data.agent_photo || '',
        is_featured: data.is_featured || false,
        available: data.available !== false,
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      alert('Error loading property');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const propertyData = {
        title: formData.title,
        address: formData.address,
        city: formData.city,
        price: parseInt(formData.price) || 0,
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseFloat(formData.bathrooms) || 0,
        sqft: parseInt(formData.sqft) || 0,
        description: formData.description,
        features: formData.features,
        images: formData.images,
        agent_name: formData.agent_name,
        agent_phone: formData.agent_phone,
        agent_email: formData.agent_email,
        agent_photo: formData.agent_photo,
        is_featured: formData.is_featured,
        available: formData.available,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);

        if (error) throw error;
      }

      setSaved(true);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const addImage = () => {
    if (newImage.trim() && newImage.startsWith('http')) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="mr-4">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">
                {isEditing ? 'Edit Property' : 'Add New Property'}
              </h1>
            </div>
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
            <CheckCircle className="h-5 w-5 mr-2" />
            Property saved successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Modern Downtown Loft"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main Street, Unit 4B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a city</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent ($) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="0">Studio</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Bedroom' : 'Bedrooms'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms
                </label>
                <select
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Square Feet
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the property..."
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Features & Amenities</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Features
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {FEATURE_OPTIONS.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.features.includes(feature)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add custom feature..."
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Selected ({formData.features.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Images</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x150?text=Invalid+URL';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agent Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Agent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={formData.agent_name}
                  onChange={(e) => setFormData({ ...formData, agent_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Phone
                </label>
                <input
                  type="tel"
                  value={formData.agent_phone}
                  onChange={(e) => setFormData({ ...formData, agent_phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Email
                </label>
                <input
                  type="email"
                  value={formData.agent_email}
                  onChange={(e) => setFormData({ ...formData, agent_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="agent@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Photo URL
                </label>
                <input
                  type="url"
                  value={formData.agent_photo}
                  onChange={(e) => setFormData({ ...formData, agent_photo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Featured Property</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Available for Rent</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link
              to="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Saving...' : (isEditing ? 'Update Property' : 'Create Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
