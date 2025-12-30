import collectionsData from '@/data/collections.json';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CollectionCard from '@/components/collection/CollectionCard';
import { Collection } from '@/lib/types';

export default function CollectionsPage() {
    const collections = collectionsData.collections as Collection[];

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Collections', href: '/collections' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h1 className="text-3xl font-bold mb-3 text-primary-800">
                    Hadith Collections
                </h1>
                <p className="text-gray-600">
                    Explore the major collections of Prophetic traditions, authenticated by renowned scholars.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </div>
    );
}
