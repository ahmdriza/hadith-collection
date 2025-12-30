import HadithList from '@/components/hadith/HadithList';
import Breadcrumb from '@/components/layout/Breadcrumb';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';
import hadithsData from '@/data/hadiths.json';

export default async function BookPage(props: {
    params: Promise<{ slug: string; book: string }>;
}) {
    const params = await props.params;
    const { collections } = collectionsData;
    const { books } = booksData;
    const { hadiths } = hadithsData as unknown as { hadiths: import('@/lib/types').Hadith[] };

    const collection = collections.find((c) => c.slug === params.slug);
    const book = books.find((b) => b.slug === params.book);
    const bookHadiths = hadiths.filter((h) => h.bookId === book?.id);

    if (!collection || !book) {
        return <div className="p-8 text-center text-gray-500">Not found</div>;
    }

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: collection.name, href: `/collections/${collection.slug}` },
        { label: book.name, href: `/collections/${collection.slug}/${book.slug}` },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            {/* Book Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-2 text-primary-800">{book.name}</h1>
                <p className="text-gray-600">{book.totalHadiths} hadiths in this book</p>
            </div>

            {/* Hadiths */}
            <HadithList hadiths={bookHadiths} />
        </div>
    );
}
