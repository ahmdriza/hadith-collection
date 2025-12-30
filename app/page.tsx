import Link from 'next/link';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import HeroSearch from '@/components/search/HeroSearch';

export default function HomePage() {
  const { collections } = collectionsData;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-12 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Hadith Collection</h1>
        <p className="text-lg mb-6 opacity-90 max-w-2xl">
          Search and explore authentic hadiths from classical collections. Verified resources strictly adhering to the methodology of the Salaf-us-Salih.
        </p>
        <HeroSearch />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="text-3xl font-bold text-primary-600">40,000+</div>
          <div className="text-gray-600 mt-1 font-medium">Total Hadiths</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="text-3xl font-bold text-primary-600">{collections.length}</div>
          <div className="text-gray-600 mt-1 font-medium">Collections</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="text-3xl font-bold text-primary-600">50+</div>
          <div className="text-gray-600 mt-1 font-medium">Topics</div>
        </div>
      </div>

      {/* Collections */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-primary-800 flex items-center gap-2">
          <BookOpen className="text-primary-600" /> Browse Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-700 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 font-arabic">{collection.arabicName}</p>

                  <div className="flex gap-2 text-xs mt-3">
                    <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md font-medium">
                      {collection.totalHadiths.toLocaleString()} hadiths
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                      {collection.totalBooks} books
                    </span>
                  </div>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-primary-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
