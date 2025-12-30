"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Book, Layers, FileText, Tag } from 'lucide-react';
import collectionsData from '@/data/collections.json';
import booksData from '@/data/books.json';
import topicsData from '@/data/topics.json';

// Define the structure for the tree
type CategoryItem = {
    id: string;
    title: string;
    count: number;
    type: 'collection' | 'book' | 'chapter' | 'topic';
    slug: string;
    collectionSlug?: string;
    children?: CategoryItem[];
};

// Transform JSON data into sidebar structure
function buildCollectionsData(): CategoryItem[] {
    const { collections } = collectionsData;
    const { books } = booksData;

    return collections.map(collection => ({
        id: collection.id,
        title: collection.name,
        count: collection.totalHadiths,
        type: 'collection' as const,
        slug: collection.slug,
        children: books
            .filter(book => book.collectionId === collection.id)
            .map(book => ({
                id: book.id,
                title: book.name,
                count: book.totalHadiths,
                type: 'book' as const,
                slug: book.slug,
                collectionSlug: collection.slug,
            }))
    }));
}

function buildTopicsData(): CategoryItem[] {
    const { topics } = topicsData;

    return topics.slice(0, 10).map(topic => ({
        id: topic.id,
        title: topic.name,
        count: topic.hadithCount,
        type: 'topic' as const,
        slug: topic.slug,
    }));
}

const SidebarItem = ({ item }: { item: CategoryItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    const getHref = () => {
        if (item.type === 'collection') {
            return `/collections/${item.slug}`;
        }
        if (item.type === 'book' && item.collectionSlug) {
            return `/collections/${item.collectionSlug}/${item.slug}`;
        }
        if (item.type === 'topic') {
            return `/topics/${item.slug}`;
        }
        return '#';
    };

    return (
        <div className="pl-2">
            <div className="flex items-center">
                <Link
                    href={getHref()}
                    className={`flex-1 flex items-center justify-between p-2 rounded-lg text-sm transition-colors
                        ${isOpen ? 'bg-primary-100 text-primary-800 font-medium' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {item.type === 'collection' && <Layers size={16} />}
                        {item.type === 'book' && <Book size={16} />}
                        {item.type === 'chapter' && <FileText size={16} />}
                        {item.type === 'topic' && <Tag size={16} />}
                        <span className="line-clamp-1">{item.title}</span>
                    </div>

                    <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2">
                        {item.count.toLocaleString()}
                    </span>
                </Link>

                {hasChildren && (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                )}
            </div>

            {/* Recursive Rendering */}
            {isOpen && hasChildren && (
                <div className="border-l border-gray-200 ml-4 mt-1 space-y-1">
                    {item.children!.map((child) => (
                        <SidebarItem key={child.id} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Sidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const collectionsItems = buildCollectionsData();
    const topicsItems = buildTopicsData();

    // Filter collections based on search
    const filteredCollections = searchQuery
        ? collectionsItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.children?.some(child =>
                child.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : collectionsItems;

    // Filter topics based on search
    const filteredTopics = searchQuery
        ? topicsItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : topicsItems;

    return (
        <aside className="w-72 bg-white border-r border-gray-100 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto hidden md:block p-4">
            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Filter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
            </div>

            {/* Collections Section */}
            <div className="mb-6">
                <h2 className="text-primary-800 font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 px-2">
                    <Layers className="text-primary-600" size={16} />
                    Collections
                </h2>
                <div className="space-y-1">
                    {filteredCollections.length > 0 ? (
                        filteredCollections.map((item) => (
                            <SidebarItem key={item.id} item={item} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-2 px-2">No collections found</p>
                    )}
                </div>
            </div>

            {/* Topics Section */}
            <div className="border-t border-gray-100 pt-4">
                <h2 className="text-primary-800 font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 px-2">
                    <Tag className="text-primary-600" size={16} />
                    Topics
                </h2>
                <div className="space-y-1">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map((item) => (
                            <SidebarItem key={item.id} item={item} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-2 px-2">No topics found</p>
                    )}
                </div>
                <Link
                    href="/topics"
                    className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium mt-3 py-2 hover:bg-primary-50 rounded-lg transition-colors"
                >
                    View All Topics →
                </Link>
            </div>
        </aside>
    );
}
