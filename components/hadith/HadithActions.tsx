'use client';

import { useState } from 'react';
import { Bookmark, Share2, Copy, Check, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSavedHadiths } from '@/hooks/useSavedHadiths';
import { Hadith } from '@/lib/types';

interface HadithActionsProps {
    hadith: Hadith;
}

export default function HadithActions({ hadith }: HadithActionsProps) {
    const { isHadithSaved, toggleSaveHadith } = useSavedHadiths();
    const [copied, setCopied] = useState(false);
    const [shared, setShared] = useState(false);

    const isSaved = isHadithSaved(hadith.id);

    const handleSave = () => {
        toggleSaveHadith({
            id: hadith.id,
            collectionId: hadith.collectionId,
            hadithNumber: hadith.hadithNumber,
            reference: hadith.reference,
            englishText: hadith.englishText,
        });
    };

    const handleCopy = async () => {
        const text = `${hadith.reference}\n\n${hadith.arabicText}\n\n${hadith.englishText}\n\nNarrated by: ${hadith.narrator}`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: hadith.reference,
            text: `${hadith.englishText}\n\n— ${hadith.reference}`,
            url: typeof window !== 'undefined' ? window.location.href : '',
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy link to clipboard
                await navigator.clipboard.writeText(shareData.url);
                setShared(true);
                setTimeout(() => setShared(false), 2000);
            }
        } catch (error) {
            // User cancelled or share failed
            console.error('Share failed:', error);
        }
    };

    return (
        <div className="flex gap-2 flex-wrap">
            <Button
                variant={isSaved ? 'default' : 'secondary'}
                size="sm"
                className="gap-1 text-xs md:text-sm"
                onClick={handleSave}
            >
                {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
            <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs md:text-sm"
                onClick={handleCopy}
            >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
            <Button
                variant="secondary"
                size="sm"
                className="gap-1 text-xs md:text-sm"
                onClick={handleShare}
            >
                {shared ? <Check size={14} className="text-green-600" /> : <Share2 size={14} />}
                <span className="hidden sm:inline">{shared ? 'Link Copied!' : 'Share'}</span>
            </Button>
        </div>
    );
}
