import { redirect } from 'next/navigation';

// Placeholder: Since the current structure doesn't support chapters deeply in data.
// We will redirect to the book page or display a placeholder.
// The user requested: app/collections/[slug]/[book]/[chapter]/page.tsx
// But our data model is Collection -> Book -> Hadith. 
// "Chapter" is a property of Hadith, but not a separate hierarchy container in the mock data currently 
// (though many books have chapters).
// We will implement a filtered view of the book page for a specific chapter.

import HadithList from '@/components/hadith/HadithList';
import Breadcrumb from '@/components/layout/Breadcrumb';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';
import hadithsData from '@/data/hadiths.json';

export default async function ChapterPage(props: {
    params: Promise<{ slug: string; book: string; chapter: string }>;
}) {
    const params = await props.params;
    const { collections } = collectionsData;
    const { books } = booksData;
    const { hadiths } = hadithsData as unknown as { hadiths: import('@/lib/types').Hadith[] };

    const collection = collections.find((c) => c.slug === params.slug);
    const book = books.find((b) => b.slug === params.book);

    // Decoding chapter from slug if needed, for now assuming simple string match or slug match
    const chapterName = decodeURIComponent(params.chapter).replace(/-/g, ' ');

    const chapterHadiths = hadiths.filter((h) =>
        h.bookId === book?.id && h.chapter.toLowerCase().includes(chapterName.toLowerCase())
    );

    if (!collection || !book) {
        return <div className="p-8 text-center text-gray-500">Not found</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: collection.name, href: `/collections/${collection.slug}` },
        { label: book.name, href: `/collections/${collection.slug}/${book.slug}` },
        { label: chapterName, href: '#' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-2 text-primary-800">{chapterName}</h1>
                <p className="text-gray-600">Chapter in {book.name}</p>
            </div>

            <HadithList hadiths={chapterHadiths} />
        </div>
    );
}
