import Link from 'next/link';
import { ChevronRight, Hash } from 'lucide-react';
import topicsData from '@/data/topics.json';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default function TopicsPage() {
    const { topics } = topicsData;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Topics', href: '/topics' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h1 className="text-3xl font-bold mb-3 text-primary-800">
                    Browse by Topics
                </h1>
                <p className="text-gray-600">
                    Explore hadiths organized by themes and subjects to find narrations relevant to specific life situations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic) => (
                    <Link
                        key={topic.id}
                        href={`/topics/${topic.slug}`}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-primary-50 p-1.5 rounded-lg">
                                        <Hash size={18} className="text-primary-600" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-700 transition-colors">
                                        {topic.name}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{topic.description}</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="bg-primary-50 text-primary-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                        {topic.hadithCount} hadiths
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                                        {topic.subcategories.length} subcategories
                                    </span>
                                </div>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
