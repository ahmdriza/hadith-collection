import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import HadithDetail from '@/components/hadith/HadithDetail';
import hadithsData from '@/data/hadiths.json';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';

export default async function HadithDetailPage(props: {
    params: Promise<{ collection: string; number: string }>;
}) {
    const params = await props.params;
    const { hadiths } = hadithsData as unknown as { hadiths: import('@/lib/types').Hadith[] };
    const { collections } = collectionsData;
    const { books } = booksData;

    const currentNumber = parseInt(params.number);

    const hadith = hadiths.find(
        (h) =>
            h.collectionId === params.collection &&
            h.hadithNumber === currentNumber
    );

    const collection = collections.find((c) => c.id === params.collection);
    const book = books.find((b) => b.id === hadith?.bookId);

    if (!hadith || !collection) {
        return <div className="p-8 text-center text-gray-500">Hadith not found</div>;
    }

    // Find previous and next hadiths in the same book
    const bookHadiths = hadiths
        .filter(h => h.bookId === hadith.bookId)
        .sort((a, b) => a.hadithNumber - b.hadithNumber);

    const currentIndex = bookHadiths.findIndex(h => h.id === hadith.id);
    const prevHadith = currentIndex > 0 ? bookHadiths[currentIndex - 1] : null;
    const nextHadith = currentIndex < bookHadiths.length - 1 ? bookHadiths[currentIndex + 1] : null;

    // Build breadcrumbs with book included
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: collection.name, href: `/collections/${collection.slug}` },
    ];

    if (book) {
        breadcrumbItems.push({
            label: book.name,
            href: `/collections/${collection.slug}/${book.slug}`
        });
    }

    breadcrumbItems.push({ label: `Hadith ${hadith.hadithNumber}`, href: '#' });

    const relatedHadiths = hadiths
        .filter((h) => h.id !== hadith.id && h.topics.some((t) => hadith.topics.includes(t)))
        .slice(0, 2);

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            {/* Hadith Detail Component */}
            <HadithDetail hadith={hadith} />

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {prevHadith ? (
                    <Link
                        href={`/hadith/${prevHadith.collectionId}/${prevHadith.hadithNumber}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                    >
                        <ChevronLeft size={18} />
                        Previous Hadith
                    </Link>
                ) : (
                    <div />
                )}

                <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {bookHadiths.length}
                </span>

                {nextHadith ? (
                    <Link
                        href={`/hadith/${nextHadith.collectionId}/${nextHadith.hadithNumber}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors"
                    >
                        Next Hadith
                        <ChevronRight size={18} />
                    </Link>
                ) : (
                    <div />
                )}
            </div>

            {/* Related Hadiths */}
            {relatedHadiths.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4 text-primary-800">
                        Related Hadiths
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedHadiths.map((relatedHadith) => (
                            <div
                                key={relatedHadith.id}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition cursor-pointer group"
                            >
                                <Link href={`/hadith/${relatedHadith.collectionId}/${relatedHadith.hadithNumber}`}>
                                    <div className="text-sm font-semibold text-primary-600 mb-2 group-hover:underline">
                                        {relatedHadith.reference}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                        {relatedHadith.englishText}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
