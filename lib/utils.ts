import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function formatHadithReference(collection: string, number: number): string {
    return `${collection} ${number}`;
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

export function getGradeColor(grade: string): string {
    // Updated to use Primary/Green palette instead of generic colors where appropriate to match IslamQA style
    const colors = {
        Sahih: 'bg-green-100 text-green-700 border-green-300',
        Hasan: 'bg-primary-100 text-primary-700 border-primary-300',
        Daif: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        Mixed: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[grade as keyof typeof colors] || colors.Mixed;
}
