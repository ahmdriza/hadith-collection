import { Search, BookOpen, Bookmark, FileQuestion } from 'lucide-react';
import Link from 'next/link';

type EmptyStateVariant = 'search' | 'saved' | 'hadiths' | 'default';

interface EmptyStateProps {
    variant?: EmptyStateVariant;
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
}

const variants = {
    search: {
        icon: Search,
        title: 'No Results Found',
        description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
    },
    saved: {
        icon: Bookmark,
        title: 'No Saved Hadiths',
        description: 'Hadiths you save will appear here for easy access later.',
    },
    hadiths: {
        icon: BookOpen,
        title: 'No Hadiths Available',
        description: 'There are no hadiths in this section yet.',
    },
    default: {
        icon: FileQuestion,
        title: 'Nothing Here',
        description: 'There\'s nothing to display at the moment.',
    },
};

export default function EmptyState({
    variant = 'default',
    title,
    description,
    actionLabel,
    actionHref,
}: EmptyStateProps) {
    const config = variants[variant];
    const Icon = config.icon;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Icon size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {title || config.title}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mb-6">
                {description || config.description}
            </p>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
