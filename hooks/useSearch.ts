'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return { query, setQuery, handleSearch };
}
