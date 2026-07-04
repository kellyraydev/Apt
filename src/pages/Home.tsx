import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Star, Building2 } from 'lucide-react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

export default function Home() {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 mt-2">Handpicked apartments from our collection</p>
            </div>
            <Link
              to="/listings"
              className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Listings
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/listings"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              View All Listings
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose PrimeRentals?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've simplified apartment hunting with powerful search tools, verified listings, and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Listings',
                description: 'Every property is verified by our team to ensure quality and accuracy.',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Our support team is always available to help you find your perfect home.',
              },
              {
                icon: Star,
                title: 'Top Rated Agents',
                description: 'Work with experienced agents who know their markets inside out.',
              },
              {
                icon: Building2,
                title: 'Wide Selection',
                description: 'From studios to luxury penthouses, find every type of living space.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy tenants who found their perfect home through PrimeRentals.
            Start your search today.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse All Listings
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
