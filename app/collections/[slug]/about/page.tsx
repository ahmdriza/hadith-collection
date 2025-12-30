import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import collectionsData from '@/data/collections.json';
import collectionDetailsData from '@/data/collection-details.json';
import { Collection } from '@/lib/types';

interface CollectionDetail {
    id: string;
    introduction: string;
    authorBio: { title: string; content: string };
    methodology: { title: string; content: string; points: string[]; additionalInfo: string };
    students: { title: string; content: string };
    death: { title: string; content: string };
    compilation: { title: string; content: string };
}

export default async function CollectionAboutPage(props: {
    params: Promise<{ slug: string }>
}) {
    const params = await props.params;
    const collections = collectionsData.collections as Collection[];
    const { collectionDetails } = collectionDetailsData as { collectionDetails: CollectionDetail[] };

    const collection = collections.find(c => c.slug === params.slug);
    const details = collectionDetails.find(d => d.id === collection?.id);

    if (!collection) {
        notFound();
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: collection.name, href: `/collections/${collection.slug}` },
        { label: 'About', href: `/collections/${collection.slug}/about` },
    ];

    return (
        <div className="space-y-8">
            <Breadcrumb items={breadcrumbItems} />

            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">About {collection.name}</h1>
                <p className="text-xl font-arabic opacity-90">{collection.arabicName}</p>
            </div>

            {details ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    {/* Introduction */}
                    <div className="p-8 border-b border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {details.introduction}
                        </p>
                    </div>

                    {/* Author Bio */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-800 mb-4">
                            {details.authorBio.title}
                        </h2>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {details.authorBio.content}
                        </div>
                    </div>

                    {/* Compilation */}
                    {details.compilation && (
                        <div className="p-8 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-primary-800 mb-4">
                                {details.compilation.title}
                            </h2>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {details.compilation.content}
                            </div>
                        </div>
                    )}

                    {/* Methodology */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-800 mb-4">
                            {details.methodology.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {details.methodology.content}
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                            {details.methodology.points.map((point, index) => (
                                <li key={index} className="leading-relaxed">
                                    {point}
                                </li>
                            ))}
                        </ol>
                        <p className="text-gray-700 leading-relaxed">
                            {details.methodology.additionalInfo}
                        </p>
                    </div>

                    {/* Students */}
                    <div className="p-8 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-primary-800 mb-4">
                            {details.students.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {details.students.content}
                        </p>
                    </div>

                    {/* Death */}
                    <div className="p-8">
                        <h2 className="text-xl font-bold text-primary-800 mb-4">
                            {details.death.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {details.death.content}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                    <p className="text-gray-600 text-center">
                        Detailed information about this collection is coming soon.
                    </p>
                </div>
            )}

            {/* Back Link */}
            <div className="flex justify-center">
                <Link
                    href={`/collections/${collection.slug}`}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                    Browse {collection.name} Books
                </Link>
            </div>
        </div>
    );
}
