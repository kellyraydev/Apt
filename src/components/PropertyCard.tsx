import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export default function PropertyCard({ property, onToggleFavorite, isFavorite = false }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        {property.isFeatured && (
          <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(property.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-blue-600">
            ${property.price.toLocaleString()}<span className="text-sm text-gray-500 font-normal">/mo</span>
          </p>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 border-t pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Beds`}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="mt-4 block w-full bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
