import { Metadata } from 'next';
import HadithList from '@/components/hadith/HadithList';
import Breadcrumb from '@/components/layout/Breadcrumb';
import topicsData from '@/data/topics.json';
import hadithsData from '@/data/hadiths.json';
import { Hadith } from '@/lib/types';

// Dynamic metadata for SEO
export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const { topics } = topicsData;
    const topic = topics.find((t) => t.slug === params.slug);

    if (!topic) {
        return {
            title: 'Topic Not Found | IslamQA.Ref',
            description: 'The requested topic could not be found.',
        };
    }

    return {
        title: `${topic.name} - Hadith by Topic | IslamQA.Ref`,
        description: `${topic.description} Browse ${topic.hadithCount} hadiths about ${topic.name.toLowerCase()}.`,
        keywords: [topic.name, ...topic.subcategories, 'hadith', 'Islamic topics'],
        openGraph: {
            title: `${topic.name} - Hadiths by Topic`,
            description: topic.description,
            type: 'website',
            siteName: 'IslamQA.Ref',
        },
    };
}

export default async function TopicDetailPage(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const { topics } = topicsData;
    const { hadiths } = hadithsData as unknown as { hadiths: import('@/lib/types').Hadith[] };

    const topic = topics.find((t) => t.slug === params.slug);

    // Find hadiths that have this topic in their topics array
    // Simplified matching for demo purposes
    const topicHadiths = hadiths.filter((h) =>
        h.topics.some((t) => t.includes(params.slug) || params.slug.includes(t))
    );

    if (!topic) {
        return <div className="p-8 text-center text-gray-500">Topic not found</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Topics', href: '/topics' },
        { label: topic.name, href: `/topics/${topic.slug}` },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            {/* Topic Header */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold mb-3 text-primary-800">{topic.name}</h1>
                <p className="text-gray-600 mb-6 max-w-2xl leading-relaxed">{topic.description}</p>
                <div className="flex gap-4">
                    <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium border border-primary-100">
                        {topic.hadithCount} hadiths found
                    </span>
                </div>
            </div>

            {/* Subcategories */}
            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-semibold mb-3 text-gray-800 text-sm uppercase tracking-wider">Subcategories</h3>
                <div className="flex flex-wrap gap-2">
                    {topic.subcategories.map((sub) => (
                        <span
                            key={sub}
                            className="bg-white px-4 py-2 rounded-lg text-sm text-gray-700 border border-gray-200 shadow-sm hover:border-primary-300 transition cursor-default"
                        >
                            {sub}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hadiths */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-primary-800 border-b border-gray-200 pb-2 mb-4">
                    Hadiths about {topic.name}
                </h2>
                <HadithList hadiths={topicHadiths} />

            </div>
        </div>
    );
}
