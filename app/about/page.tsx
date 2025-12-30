import Link from 'next/link';
import { BookOpen, User, Calendar, Award } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';
import { Collection } from '@/lib/types';

export default function AboutPage() {
    const collections = collectionsData.collections as Collection[];
    const { books } = booksData;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
    ];

    return (
        <div className="space-y-8">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-3">About Our Hadith Collections</h1>
                <p className="text-lg opacity-90 max-w-3xl">
                    Explore the major collections of Prophetic traditions, compiled by renowned Islamic scholars.
                    Each collection represents years of meticulous verification and authentication.
                </p>
            </div>

            {/* Collections with Books */}
            <div className="space-y-10">
                {collections.map((collection) => {
                    const collectionBooks = books.filter(b => b.collectionId === collection.id);

                    return (
                        <div key={collection.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            {/* Collection Header */}
                            <div className="bg-primary-50 p-6 border-b border-primary-100">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Link
                                            href={`/collections/${collection.slug}`}
                                            className="text-2xl font-bold text-primary-800 hover:text-primary-600 transition-colors"
                                        >
                                            {collection.name}
                                        </Link>
                                        <p className="text-lg text-primary-600 font-arabic mt-1">{collection.arabicName}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${collection.grade === 'Sahih'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {collection.grade}
                                    </span>
                                </div>

                                <p className="text-gray-600 mt-4 leading-relaxed">
                                    {collection.description}
                                </p>

                                {/* Collection Stats */}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User size={16} className="text-primary-500" />
                                        <span>{collection.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen size={16} className="text-primary-500" />
                                        <span>{collection.totalBooks} Books</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Award size={16} className="text-primary-500" />
                                        <span>{collection.totalHadiths.toLocaleString()} Hadiths</span>
                                    </div>
                                </div>
                            </div>

                            {/* Books Grid */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Books in this Collection
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {collectionBooks.map((book) => (
                                        <Link
                                            key={book.id}
                                            href={`/collections/${collection.slug}/${book.slug}`}
                                            className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 hover:bg-primary-50/30 transition-all group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 font-bold text-sm group-hover:bg-primary-600 group-hover:text-white transition-colors flex-shrink-0">
                                                    {book.bookNumber}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-medium text-gray-800 group-hover:text-primary-700 transition-colors">
                                                        {book.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 font-arabic">{book.arabicName}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{book.totalHadiths} hadiths</p>
                                                    {book.description && (
                                                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                                            {book.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {collectionBooks.length === 0 && (
                                    <p className="text-sm text-gray-500 text-center py-4">
                                        No books available in the current dataset.
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">About This Project</h3>
                <p className="text-blue-700 leading-relaxed">
                    This Hadith collection website provides authentic Prophetic traditions adhering to the
                    methodology of the Salaf-us-Salih. All hadiths are sourced from verified classical
                    collections and include their authentication grades.
                </p>
            </div>
        </div>
    );
}
