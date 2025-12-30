'use client';

import { Search } from 'lucide-react';
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useSearch } from '@/hooks/useSearch';

export default function SearchBar() {
    const { query, setQuery, handleSearch } = useSearch();

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
            <Input
                type="text"
                placeholder="Search hadiths by keyword, topic, or narrator..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-4 pr-12 py-6 rounded-full border-primary-200 focus:ring-primary-500 shadow-sm text-base"
            />
            <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 hover:bg-transparent text-gray-400 hover:text-primary-600"
            >
                <Search size={20} />
            </Button>
        </form>
    );
}
