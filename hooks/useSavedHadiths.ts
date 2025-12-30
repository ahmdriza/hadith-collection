'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'saved-hadiths';

export interface SavedHadith {
    id: string;
    collectionId: string;
    hadithNumber: number;
    reference: string;
    englishText: string;
    savedAt: string;
}

export function useSavedHadiths() {
    const [savedHadiths, setSavedHadiths] = useState<SavedHadith[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved hadiths from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSavedHadiths(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load saved hadiths:', error);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever savedHadiths changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(savedHadiths));
            } catch (error) {
                console.error('Failed to save hadiths:', error);
            }
        }
    }, [savedHadiths, isLoaded]);

    const saveHadith = useCallback((hadith: Omit<SavedHadith, 'savedAt'>) => {
        setSavedHadiths((prev) => {
            // Don't add if already saved
            if (prev.some((h) => h.id === hadith.id)) {
                return prev;
            }
            return [...prev, { ...hadith, savedAt: new Date().toISOString() }];
        });
    }, []);

    const removeHadith = useCallback((hadithId: string) => {
        setSavedHadiths((prev) => prev.filter((h) => h.id !== hadithId));
    }, []);

    const isHadithSaved = useCallback(
        (hadithId: string) => {
            return savedHadiths.some((h) => h.id === hadithId);
        },
        [savedHadiths]
    );

    const toggleSaveHadith = useCallback(
        (hadith: Omit<SavedHadith, 'savedAt'>) => {
            if (isHadithSaved(hadith.id)) {
                removeHadith(hadith.id);
                return false; // Now unsaved
            } else {
                saveHadith(hadith);
                return true; // Now saved
            }
        },
        [isHadithSaved, removeHadith, saveHadith]
    );

    const clearAllSaved = useCallback(() => {
        setSavedHadiths([]);
    }, []);

    return {
        savedHadiths,
        isLoaded,
        saveHadith,
        removeHadith,
        isHadithSaved,
        toggleSaveHadith,
        clearAllSaved,
        savedCount: savedHadiths.length,
    };
}
