import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import { Property } from '../types';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Initialize filters from URL params
  const initialFilters = {
    city: searchParams.get('city') || '',
    searchTerm: searchParams.get('q') || '',
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: null,
  };

  useEffect(() => {
    let result = [...properties];

    // Apply filters from URL params
    const cityParam = searchParams.get('city');
    const queryParam = searchParams.get('q')?.toLowerCase();

    if (cityParam) {
      result = result.filter(p => p.city.toLowerCase() === cityParam.toLowerCase());
    }

    if (queryParam) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(queryParam) ||
        p.city.toLowerCase().includes(queryParam) ||
        p.address.toLowerCase().includes(queryParam)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sqft') {
      result.sort((a, b) => b.sqft - a.sqft);
    }

    setFilteredProperties(result);
  }, [searchParams, sortBy]);

  const handleFilter = (filters: {
    city: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number | null;
    searchTerm: string;
  }) => {
    let result = [...properties];

    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term) ||
        p.address.toLowerCase().includes(term)
      );
    }

    // Apply city filter
    if (filters.city) {
      result = result.filter(p => p.city.toLowerCase() === filters.city.toLowerCase());
    }

    // Apply price range
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Apply bedrooms filter
    if (filters.bedrooms !== null) {
      if (filters.bedrooms === 4) {
        result = result.filter(p => p.bedrooms >= 4);
      } else {
        result = result.filter(p => p.bedrooms === filters.bedrooms);
      }
    }

    // Update URL params
    const params: Record<string, string> = {};
    if (filters.city) params.city = filters.city;
    if (filters.searchTerm) params.q = filters.searchTerm;
    setSearchParams(params);

    // Apply current sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sqft') {
      result.sort((a, b) => b.sqft - a.sqft);
    }

    setFilteredProperties(result);
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Browse Apartments</h1>
          <p className="text-blue-100">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <SearchFilters onFilter={handleFilter} initialFilters={initialFilters} />

        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            Showing <span className="font-semibold">{filteredProperties.length}</span> results
          </p>

          <div className="flex items-center">
            <label className="text-gray-600 mr-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="sqft">Square Feet</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSearchParams({});
                handleFilter({ city: '', minPrice: 0, maxPrice: 10000, bedrooms: null, searchTerm: '' });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
