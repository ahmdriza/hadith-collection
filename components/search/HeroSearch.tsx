'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface HeroSearchProps {
    placeholder?: string;
}

export default function HeroSearch({ placeholder = "Search hadiths by keyword, topic, or narrator..." }: HeroSearchProps) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative max-w-2xl w-full">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full px-6 py-4 rounded-full text-gray-800 pr-14 focus:outline-none focus:ring-4 focus:ring-primary-400 placeholder-gray-400 font-medium shadow-lg"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
                <Search size={20} />
            </button>
        </form>
    );
}
