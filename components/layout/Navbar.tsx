'use client';

import Link from 'next/link';
import { Menu, X, Bookmark } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-primary-50 border-b border-primary-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary-700">
                                IslamQA<span className="text-primary-500 text-lg font-normal">.Ref</span>
                            </span>
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                href="/collections"
                                className="text-primary-700 hover:text-primary-800 font-medium"
                            >
                                Collections
                            </Link>
                            <Link
                                href="/topics"
                                className="text-primary-700 hover:text-primary-800 font-medium"
                            >
                                Topics
                            </Link>
                            <Link
                                href="/search"
                                className="text-primary-700 hover:text-primary-800 font-medium"
                            >
                                Search
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/saved"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition shadow-sm"
                        >
                            <Bookmark size={16} />
                            Saved
                        </Link>
                        <button
                            className="md:hidden text-primary-700 p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-primary-100 pt-4 space-y-3">
                        <Link
                            href="/collections"
                            className="block text-primary-700 hover:text-primary-800 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Collections
                        </Link>
                        <Link
                            href="/topics"
                            className="block text-primary-700 hover:text-primary-800 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Topics
                        </Link>
                        <Link
                            href="/search"
                            className="block text-primary-700 hover:text-primary-800 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Search
                        </Link>
                        <Link
                            href="/saved"
                            className="block text-primary-700 hover:text-primary-800 font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Saved Hadiths
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
