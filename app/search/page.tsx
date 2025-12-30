import { Suspense } from 'react';
import { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SearchBar from '@/components/search/SearchBar';
import SearchFilters from '@/components/search/SearchFilters';
import HadithList from '@/components/hadith/HadithList';
import EmptyState from '@/components/ui/EmptyState';
import { SkeletonHadithCard } from '@/components/ui/Skeleton';
import hadithsData from '@/data/hadiths.json';
import { Hadith } from '@/lib/types';

export const metadata: Metadata = {
    title: 'Search Hadith | IslamQA.Ref',
    description: 'Search through thousands of authentic hadiths from Sahih Bukhari, Sahih Muslim, and other major collections. Filter by collection, grade, and topic.',
    keywords: ['search hadith', 'hadith search', 'find hadith', 'Islamic search'],
    openGraph: {
        title: 'Search Hadith Collection',
        description: 'Search through thousands of authentic hadiths from major collections.',
        type: 'website',
        siteName: 'IslamQA.Ref',
    },
};

interface SearchParams {
    q?: string;
    collection?: string;
    grade?: string;
    topic?: string;
}

// Search with filters
async function SearchResults({ searchParams }: { searchParams: SearchParams }) {
    const { hadiths } = hadithsData as unknown as { hadiths: Hadith[] };
    const { q: query, collection, grade, topic } = searchParams;

    let results = hadiths;

    // Apply text search
    if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(h =>
            h.englishText.toLowerCase().includes(lowerQuery) ||
            h.arabicText.includes(query) ||
            h.narrator.toLowerCase().includes(lowerQuery) ||
            h.topics.some(t => t.toLowerCase().includes(lowerQuery)) ||
            h.reference.toLowerCase().includes(lowerQuery)
        );
    }

    // Apply collection filter
    if (collection) {
        results = results.filter(h => h.collectionId === collection);
    }

    // Apply grade filter
    if (grade) {
        results = results.filter(h => h.grade === grade);
    }

    // Apply topic filter
    if (topic) {
        results = results.filter(h =>
            h.topics.some(t => t.toLowerCase() === topic.toLowerCase())
        );
    }

    // If no query and no filters, show empty state
    if (!query && !collection && !grade && !topic) {
        return (
            <EmptyState
                variant="search"
                title="Search Hadith Collection"
                description="Enter a search term or use filters to find hadiths from the collection."
            />
        );
    }

    const hasFilters = collection || grade || topic;
    const filterText = hasFilters ? ' (with filters)' : '';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl font-bold text-gray-800">
                    {query ? `Results for "${query}"${filterText}` : `Filtered Results`}
                </h2>
                <span className="text-sm text-gray-500">
                    {results.length} {results.length === 1 ? 'hadith' : 'hadiths'} found
                </span>
            </div>
            {results.length > 0 ? (
                <HadithList hadiths={results} />
            ) : (
                <EmptyState
                    variant="search"
                    description="No hadiths match your search criteria. Try adjusting your filters or search terms."
                />
            )}
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            <SkeletonHadithCard />
            <SkeletonHadithCard />
            <SkeletonHadithCard />
        </div>
    );
}

export default async function SearchPage(props: {
    searchParams: Promise<SearchParams>
}) {
    const searchParams = await props.searchParams;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Search', href: '/search' },
    ];

    return (
        <div className="space-y-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="flex flex-col items-center space-y-6 mb-8">
                <h1 className="text-3xl font-bold text-primary-800">Search Hadith Collection</h1>
                <SearchBar />
                <SearchFilters />
            </div>

            <Suspense fallback={<LoadingSkeleton />}>
                <SearchResults searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
