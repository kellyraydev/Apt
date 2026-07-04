import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { cities } from '../data/properties';

interface SearchFiltersProps {
  onFilter: (filters: {
    city: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number | null;
    searchTerm: string;
  }) => void;
  initialFilters?: {
    city: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: number | null;
    searchTerm: string;
  };
}

export default function SearchFilters({ onFilter, initialFilters }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState(initialFilters?.city || '');
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || 10000);
  const [bedrooms, setBedrooms] = useState<number | null>(initialFilters?.bedrooms || null);
  const [searchTerm, setSearchTerm] = useState(initialFilters?.searchTerm || '');

  const applyFilters = () => {
    onFilter({ city, minPrice, maxPrice, bedrooms, searchTerm });
    setIsOpen(false);
  };

  const clearFilters = () => {
    setCity('');
    setMinPrice(0);
    setMaxPrice(10000);
    setBedrooms(null);
    setSearchTerm('');
    onFilter({ city: '', minPrice: 0, maxPrice: 10000, bedrooms: null, searchTerm: '' });
  };

  const hasActiveFilters = city || minPrice > 0 || maxPrice < 10000 || bedrooms !== null || searchTerm;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search apartments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center px-4 py-3 rounded-lg border transition-colors ${
              isOpen || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </button>

          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isOpen && (
        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <select
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>No Min</option>
              <option value={1000}>$1,000</option>
              <option value={2000}>$2,000</option>
              <option value={3000}>$3,000</option>
              <option value={4000}>$4,000</option>
              <option value={5000}>$5,000</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={2000}>$2,000</option>
              <option value={3000}>$3,000</option>
              <option value={4000}>$4,000</option>
              <option value={5000}>$5,000</option>
              <option value={7500}>$7,500</option>
              <option value={10000}>$10,000</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
            <div className="flex gap-2">
              {[null, 0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num ?? 'any'}
                  onClick={() => setBedrooms(num)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    bedrooms === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {num === null ? 'Any' : num === 0 ? 'Studio' : num === 4 ? '4+' : num}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-4 flex justify-end gap-3 mt-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear All
              </button>
            )}
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
