export interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  isFeatured: boolean;
  available: boolean;
}

export interface SearchFilters {
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | null;
  minSqft: number;
}
