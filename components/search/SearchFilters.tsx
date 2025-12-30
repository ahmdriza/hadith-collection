'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import collectionsData from '@/data/collections.json';
import topicsData from '@/data/topics.json';

export default function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCollection = searchParams.get('collection') || '';
    const currentGrade = searchParams.get('grade') || '';
    const currentTopic = searchParams.get('topic') || '';

    const { collections } = collectionsData;
    const { topics } = topicsData;

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // Preserve the search query if it exists
        const query = searchParams.get('q');
        if (query) {
            params.set('q', query);
        }

        router.push(`/search?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Collection</label>
                <div className="relative">
                    <select
                        value={currentCollection}
                        onChange={(e) => updateFilter('collection', e.target.value)}
                        className="block w-full min-w-[160px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">All Collections</option>
                        {collections.map((col) => (
                            <option key={col.id} value={col.id}>
                                {col.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Grade</label>
                <div className="relative">
                    <select
                        value={currentGrade}
                        onChange={(e) => updateFilter('grade', e.target.value)}
                        className="block w-full min-w-[140px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">Any Grade</option>
                        <option value="Sahih">Sahih</option>
                        <option value="Hasan">Hasan</option>
                        <option value="Daif">Daif</option>
                    </select>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Topic</label>
                <div className="relative">
                    <select
                        value={currentTopic}
                        onChange={(e) => updateFilter('topic', e.target.value)}
                        className="block w-full min-w-[160px] rounded-md border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500 bg-white py-2 pl-3 pr-8 shadow-sm appearance-none cursor-pointer"
                    >
                        <option value="">All Topics</option>
                        {topics.slice(0, 15).map((topic) => (
                            <option key={topic.id} value={topic.slug}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Clear filters button */}
            {(currentCollection || currentGrade || currentTopic) && (
                <div className="flex items-end">
                    <button
                        onClick={() => {
                            const params = new URLSearchParams();
                            const query = searchParams.get('q');
                            if (query) params.set('q', query);
                            router.push(`/search?${params.toString()}`);
                        }}
                        className="text-sm text-primary-600 hover:text-primary-800 font-medium py-2"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}
