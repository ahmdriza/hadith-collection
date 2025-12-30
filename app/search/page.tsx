import { Suspense } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SearchBar from '@/components/search/SearchBar';
import SearchFilters from '@/components/search/SearchFilters';
import HadithList from '@/components/hadith/HadithList';
import hadithsData from '@/data/hadiths.json';

// Simple search implementation
async function SearchResults({ query }: { query: string }) {
    // Cast data
    const { hadiths } = hadithsData as unknown as { hadiths: import('@/lib/types').Hadith[] };

    let results = hadiths;

    if (query) {
        const lowerQuery = query.toLowerCase();
        results = hadiths.filter(h =>
            h.englishText.toLowerCase().includes(lowerQuery) ||
            h.arabicText.includes(query) ||
            h.narrator.toLowerCase().includes(lowerQuery) ||
            h.topics.some(t => t.toLowerCase().includes(lowerQuery))
        );
    } else {
        results = []; // No query, no results to show by default or show all? Let's show empty
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    {query ? `Search Results for "${query}"` : 'Enter a search term'}
                </h2>
                <span className="text-sm text-gray-500">{results.length} results found</span>
            </div>
            <HadithList hadiths={results} />
        </div>
    );
}


export default async function SearchPage(props: { searchParams: Promise<{ q: string }> }) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || '';

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

            <Suspense fallback={<div>Loading results...</div>}>
                <SearchResults query={query} />
            </Suspense>
        </div>
    );
}
