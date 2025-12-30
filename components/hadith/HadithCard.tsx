import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Hadith } from '@/lib/types';
import GradeBadge from './GradeBadge';

interface HadithCardProps {
    hadith: Hadith;
}

export default function HadithCard({ hadith }: HadithCardProps) {
    // Truncate text for preview
    const truncate = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    return (
        <Link
            href={`/hadith/${hadith.collectionId}/${hadith.hadithNumber}`}
            className="block bg-white rounded-lg border border-gray-100 p-4 hover:border-primary-200 hover:shadow-sm transition-all group"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary-700 font-semibold text-sm group-hover:text-primary-800">
                            Hadith #{hadith.hadithNumber}
                        </span>
                        <GradeBadge grade={hadith.grade} />
                    </div>

                    {/* Arabic Preview */}
                    <p className="text-right font-arabic text-base text-gray-700 line-clamp-1 mb-1.5">
                        {truncate(hadith.arabicText, 80)}
                    </p>

                    {/* English Preview */}
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {truncate(hadith.englishText, 120)}
                    </p>
                </div>

                <ChevronRight size={18} className="text-gray-300 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
            </div>
        </Link>
    );
}
