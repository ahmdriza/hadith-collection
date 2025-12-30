'use client';

import { Bookmark, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { useSavedHadiths } from '@/hooks/useSavedHadiths';
import EmptyState from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function SavedPage() {
    const { savedHadiths, isLoaded, removeHadith, clearAllSaved } = useSavedHadiths();

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Saved Hadiths', href: '/saved' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-primary-800 flex items-center gap-3">
                            <Bookmark className="text-primary-600" />
                            Saved Hadiths
                        </h1>
                        <p className="text-gray-600">
                            {isLoaded && savedHadiths.length > 0
                                ? `You have ${savedHadiths.length} saved hadith${savedHadiths.length > 1 ? 's' : ''}.`
                                : 'Access your bookmarked hadiths here for quick reference.'}
                        </p>
                    </div>
                    {savedHadiths.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearAllSaved}
                            className="text-error-600 hover:bg-error-50"
                        >
                            <Trash2 size={14} className="mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            {!isLoaded ? (
                <div className="text-center py-20 text-gray-400">Loading...</div>
            ) : savedHadiths.length === 0 ? (
                <EmptyState
                    variant="saved"
                    actionLabel="Browse Collections"
                    actionHref="/collections"
                />
            ) : (
                <div className="space-y-4">
                    {savedHadiths.map((hadith) => (
                        <div
                            key={hadith.id}
                            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition group"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <Link
                                    href={`/hadith/${hadith.collectionId}/${hadith.hadithNumber}`}
                                    className="flex-1 min-w-0"
                                >
                                    <div className="text-sm font-semibold text-primary-600 mb-2 group-hover:underline">
                                        {hadith.reference}
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                        {hadith.englishText}
                                    </p>
                                    <div className="text-xs text-gray-400 mt-2">
                                        Saved on {new Date(hadith.savedAt).toLocaleDateString()}
                                    </div>
                                </Link>
                                <button
                                    onClick={() => removeHadith(hadith.id)}
                                    className="p-2 text-gray-400 hover:text-error-500 hover:bg-error-50 rounded-lg transition-colors flex-shrink-0"
                                    title="Remove from saved"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
