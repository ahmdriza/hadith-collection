export interface Collection {
    id: string;
    name: string;
    arabicName: string;
    author: string;
    totalHadiths: number;
    totalBooks: number;
    description: string;
    grade: 'Sahih' | 'Hasan' | 'Daif' | 'Mixed';
    slug: string;
}

export interface Book {
    id: string;
    collectionId: string;
    bookNumber: number;
    name: string;
    arabicName: string;
    slug: string;
    totalHadiths: number;
    description: string;
}

export interface Hadith {
    id: string;
    collectionId: string;
    bookId: string;
    hadithNumber: number;
    chapter: string;
    arabicText: string;
    englishText: string;
    narrator: string;
    narratorChain: string[];
    grade: 'Sahih' | 'Hasan' | 'Daif';
    commentary: string;
    topics: string[];
    reference: string;
}

export interface Topic {
    id: string;
    name: string;
    arabicName: string;
    slug: string;
    description: string;
    hadithCount: number;
    subcategories: string[];
}

export interface BreadcrumbItem {
    label: string;
    href: string;
}
