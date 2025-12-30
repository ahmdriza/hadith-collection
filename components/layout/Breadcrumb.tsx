import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-2 text-sm mb-4 md:mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide pb-1">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
                    {index === items.length - 1 ? (
                        <span className="text-primary-800 font-medium">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-primary-600 hover:underline hover:text-primary-700 transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
