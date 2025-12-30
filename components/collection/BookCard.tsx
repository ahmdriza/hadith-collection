import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Book } from '@/lib/types';

interface BookCardProps {
    book: Book;
    collectionSlug: string;
}

export default function BookCard({ book, collectionSlug }: BookCardProps) {
    return (
        <Link
            href={`/collections/${collectionSlug}/${book.slug}`}
            className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-lg hover:border-primary-200 hover:bg-primary-50/30 transition-all group"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-md flex items-center justify-center text-primary-700 text-sm font-bold group-hover:bg-primary-600 group-hover:text-white transition-colors flex-shrink-0">
                    {book.bookNumber}
                </div>
                <div className="min-w-0">
                    <div className="font-medium text-sm text-gray-800 group-hover:text-primary-700 transition-colors truncate">
                        {book.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="font-arabic truncate">{book.arabicName}</span>
                        <span>•</span>
                        <span>{book.totalHadiths} hadiths</span>
                    </div>
                </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0" />
        </Link>
    );
}
