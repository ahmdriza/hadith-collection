import Link from 'next/link';
import { Metadata } from 'next';
import { Search } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';
import Breadcrumb from '@/components/layout/Breadcrumb';
import BookCard from '@/components/collection/BookCard';

// Dynamic metadata for SEO
export async function generateMetadata(props: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const params = await props.params;
    const { collections } = collectionsData;
    const collection = collections.find((c) => c.slug === params.slug);

    if (!collection) {
        return {
            title: 'Collection Not Found | IslamQA.Ref',
            description: 'The requested collection could not be found.',
        };
    }

    return {
        title: `${collection.name} | Hadith Collection | IslamQA.Ref`,
        description: `${collection.description} Contains ${collection.totalHadiths.toLocaleString()} hadiths in ${collection.totalBooks} books.`,
        keywords: [collection.name, collection.author, 'hadith', 'Islamic', collection.grade],
        openGraph: {
            title: collection.name,
            description: collection.description,
            type: 'website',
            siteName: 'IslamQA.Ref',
        },
        twitter: {
            card: 'summary',
            title: collection.name,
            description: collection.description,
        },
    };
}

export default async function CollectionPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { collections } = collectionsData;
    const { books } = booksData;

    const collection = collections.find((c) => c.slug === params.slug);
    const collectionBooks = books.filter((b) => b.collectionId === collection?.id);

    if (!collection) {
        return <div className="p-8 text-center text-gray-500">Collection not found</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
        { label: collection.name, href: `/collections/${collection.slug}` },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            {/* Collection Header */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold mb-3 text-primary-800">
                    {collection.name}
                </h1>
                <p className="text-gray-600 mb-4 max-w-3xl leading-relaxed">
                    {collection.description}
                </p>
                <div className="flex gap-3 text-sm flex-wrap items-center">
                    <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
                        {collection.totalHadiths.toLocaleString()} Hadiths
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {collection.totalBooks} Books
                    </span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                        Grade: {collection.grade}
                    </span>
                    <Link
                        href={`/collections/${collection.slug}/about`}
                        className="text-primary-600 hover:text-primary-800 font-medium underline underline-offset-2"
                    >
                        About this collection →
                    </Link>
                </div>
            </div>

            {/* Search within collection */}
            <div className="relative">
                <InputShim
                    placeholder={`Search within ${collection.name}...`}
                />
            </div>

            {/* Books List */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-primary-800">
                    Books in this Collection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {collectionBooks.map((book) => (
                        <BookCard key={book.id} book={book} collectionSlug={collection.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function InputShim({ placeholder }: { placeholder: string }) {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-6 py-3.5 bg-white rounded-xl shadow-sm border border-gray-200 pr-12 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={20} />
        </div>
    )
}
