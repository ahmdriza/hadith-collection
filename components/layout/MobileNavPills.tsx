'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import topicsData from '@/data/topics.json';

export default function MobileNavPills() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const { collections } = collectionsData;
    const { topics } = topicsData;

    // Determine active collection from URL
    const activeCollectionSlug = pathname.split('/')[2] || '';

    // Check if current page is a book page or hadith detail page
    const pathParts = pathname.split('/').filter(Boolean);
    const isBookPage = pathParts[0] === 'collections' && pathParts.length >= 2;
    const isHadithPage = pathParts[0] === 'hadith' && pathParts.length >= 2;
    const shouldShow = isBookPage || isHadithPage;

    // Measure content height for animation
    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, []);

    // Don't render if not on book or hadith page
    if (!shouldShow) return null;

    return (
        <div className="md:hidden mb-0">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors mb-2"
            >
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
                <span>{isOpen ? 'Hide' : 'Browse'}</span>
            </button>

            {/* Pills Container - Animated height */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    maxHeight: isOpen ? `${contentHeight}px` : '0px',
                    opacity: isOpen ? 1 : 0
                }}
            >
                <div ref={contentRef} className="space-y-2 pb-1">
                    {/* Collections Pills */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.slug}`}
                                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCollectionSlug === collection.slug
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {collection.name}
                            </Link>
                        ))}
                    </div>

                    {/* Topics Pills - smaller size and blue color */}
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                        {topics.slice(0, 10).map((topic) => (
                            <Link
                                key={topic.id}
                                href={`/topics/${topic.slug}`}
                                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${pathname === `/topics/${topic.slug}`
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    }`}
                            >
                                {topic.name}
                            </Link>
                        ))}
                        <Link
                            href="/topics"
                            className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                            More →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
