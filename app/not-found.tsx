import Link from 'next/link';
import { Home, Search, BookOpen } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center px-4">
                {/* 404 Graphic */}
                <div className="mb-8">
                    <div className="text-8xl font-bold text-primary-200 mb-2">404</div>
                    <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Sorry, the page you're looking for doesn't exist or may have been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                    <Link
                        href="/search"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                        <Search size={18} />
                        Search Hadiths
                    </Link>
                    <Link
                        href="/collections"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors"
                    >
                        <BookOpen size={18} />
                        Browse Collections
                    </Link>
                </div>
            </div>
        </div>
    );
}
