import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Collection } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/Card";

interface CollectionCardProps {
    collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link href={`/collections/${collection.slug}`}>
            <Card className="hover:shadow-md hover:border-primary-200 transition-all group h-full">
                <CardContent className="p-6 flex items-start justify-between h-full">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="text-primary-600" size={24} />
                                <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-700 transition-colors">
                                    {collection.name}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-500 mb-1 font-arabic">{collection.arabicName}</p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{collection.description}</p>
                        </div>

                        <div className="flex gap-2 text-xs mt-2">
                            <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md font-medium">
                                {collection.totalHadiths.toLocaleString()} hadiths
                            </span>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
                                {collection.totalBooks} books
                            </span>
                        </div>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                </CardContent>
            </Card>
        </Link>
    );
}
