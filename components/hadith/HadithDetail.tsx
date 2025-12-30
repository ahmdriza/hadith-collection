import Link from 'next/link';
import { Bookmark, Share2, Download, Copy, ArrowLeft } from 'lucide-react';
import { Hadith } from '@/lib/types';
import GradeBadge from './GradeBadge';
import { Button } from '@/components/ui/Button';
import DragScroll from '@/components/ui/DragScroll';

interface HadithDetailProps {
    hadith: Hadith;
}

export default function HadithDetail({ hadith }: HadithDetailProps) {
    return (
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 gap-3">
                <div>
                    <div className="text-sm font-semibold text-primary-600 mb-2">
                        {hadith.reference}
                    </div>
                    <GradeBadge grade={hadith.grade} />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <Button variant="secondary" size="sm" className="gap-1 text-xs md:text-sm">
                        <Bookmark size={14} />
                        <span className="hidden sm:inline">Save</span>
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1 text-xs md:text-sm">
                        <Share2 size={14} />
                        <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1 text-xs md:text-sm">
                        <Download size={14} />
                        <span className="hidden sm:inline">Download</span>
                    </Button>
                </div>
            </div>

            {/* Arabic Text */}
            <div className="bg-primary-50/30 p-4 md:p-6 rounded-xl mb-6 md:mb-8">
                <div className="text-xl md:text-2xl text-right leading-[1.8] md:leading-[2] font-arabic text-gray-900">
                    {hadith.arabicText}
                </div>
            </div>

            {/* English Translation */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 text-primary-800 border-b border-gray-100 pb-2">Translation</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                    {hadith.englishText}
                </p>
            </div>

            {/* Narrator Chain */}
            <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-bold mb-3 text-primary-800 border-b border-gray-100 pb-2">
                    Chain of Narration (Isnad)
                </h3>
                <DragScroll className="bg-gray-50 p-3 md:p-5 rounded-xl border border-gray-100">
                    <div className="text-gray-700 text-sm leading-relaxed flex gap-2 items-center whitespace-nowrap">
                        {hadith.narratorChain.map((narrator, i) => (
                            <span key={i} className="flex items-center flex-shrink-0">
                                <span className="font-medium">{narrator}</span>
                                {i < hadith.narratorChain.length - 1 && <ArrowLeft size={14} className="mx-2 text-gray-400 rotate-180" />}
                            </span>
                        ))}
                    </div>
                </DragScroll>
            </div>

            {/* Commentary */}
            <div className="bg-blue-50/50 border-l-4 border-blue-200 p-6 rounded-r-xl mb-6">
                <h3 className="text-lg font-bold mb-3 text-blue-900 flex items-center gap-2">
                    Commentary
                </h3>
                <p className="text-blue-900/80 leading-relaxed">{hadith.commentary}</p>
            </div>

            {/* Topics */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {hadith.topics.map((topic) => (
                        <Link
                            key={topic}
                            href={`/topics/${topic}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm transition cursor-pointer"
                        >
                            {topic}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Reference */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-semibold mb-2 text-gray-400 uppercase tracking-wider">Reference</h3>
                <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex">
                        <span className="w-48 text-gray-400">Reference</span>
                        <span className="text-primary-600">: {hadith.reference}</span>
                    </div>
                    <div className="flex">
                        <span className="w-48 text-gray-400">In-book reference</span>
                        <span className="text-primary-600">: {hadith.chapter}, Hadith {hadith.hadithNumber}</span>
                    </div>
                    <div className="flex">
                        <span className="w-48 text-gray-400 leading-tight">USC-MSA web (English) reference<br /><span className="text-[10px]">(deprecated numbering scheme)</span></span>
                        <span className="text-primary-600">: Vol. 1, {hadith.chapter}, Hadith {hadith.hadithNumber}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
