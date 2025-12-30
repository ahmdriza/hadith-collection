import { Hadith } from '@/lib/types';
import HadithCard from './HadithCard';

interface HadithListProps {
    hadiths: Hadith[];
}

export default function HadithList({ hadiths }: HadithListProps) {
    if (hadiths.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No hadiths found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {hadiths.map((hadith) => (
                <HadithCard key={hadith.id} hadith={hadith} />
            ))}
        </div>
    );
}
