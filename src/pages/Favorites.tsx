import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState(properties);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    setFavoriteProperties(properties.filter(p => favorites.includes(p.id)));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.filter(f => f !== id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-2">
            <Heart className="h-8 w-8 text-red-400 mr-3 fill-current" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Saved Properties</h1>
          </div>
          <p className="text-blue-100">
            {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Saved Properties</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring and save properties you love by clicking the heart icon.
              Your saved listings will appear here for easy access.
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Listings
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        )}

        {favoriteProperties.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/listings"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse More Listings
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
