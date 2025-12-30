import Breadcrumb from '@/components/layout/Breadcrumb';

export default function SavedPage() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Saved Hadiths', href: '/saved' },
    ];

    return (
        <div className="space-y-6">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h1 className="text-3xl font-bold mb-3 text-primary-800">
                    Saved Hadiths
                </h1>
                <p className="text-gray-600">
                    Access your bookmarked hadiths here. (Feature coming soon with local storage implementation)
                </p>
            </div>

            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="text-gray-400 mb-4">No saved hadiths yet</div>
            </div>
        </div>
    );
}
