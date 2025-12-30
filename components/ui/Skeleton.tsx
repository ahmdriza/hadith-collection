'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-gray-200',
                className
            )}
        />
    );
}

// Pre-built skeleton variants for common use cases
export function SkeletonCard() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-md" />
                        <Skeleton className="h-6 w-16 rounded-md" />
                    </div>
                </div>
                <Skeleton className="h-5 w-5" />
            </div>
        </div>
    );
}

export function SkeletonHadithCard() {
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full mb-4 rounded-lg" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonHadithDetail() {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between mb-8">
                <div>
                    <Skeleton className="h-5 w-48 mb-2" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-24 rounded-md" />
                </div>
            </div>
            <Skeleton className="h-32 w-full mb-8 rounded-xl" />
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

export function SkeletonBookCard() {
    return (
        <div className="flex items-center justify-between p-2.5 bg-white border border-gray-100 rounded-lg">
            <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-md" />
                <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            <Skeleton className="h-4 w-4" />
        </div>
    );
}
