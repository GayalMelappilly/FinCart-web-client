import { FishCategory } from '@/app/types/admin/types';

const SEARCH_CONFIG = {
    EXACT_MATCH_SCORE: 1000,
    STARTS_WITH_BASE_SCORE: 900,
    WORD_BOUNDARY_BASE_SCORE: 700,
    FUZZY_BASE_SCORE: 400,
    FUZZY_MAX_SCORE: 599,
    FUZZY_THRESHOLD: 0.6,
    DESCRIPTION_BASE_SCORE: 399,
    MULTI_WORD_BASE_SCORE: 100,
    MULTI_WORD_NAME_BONUS: 50,
    MULTI_WORD_DESC_BONUS: 25,
    SUBSTRING_BASE_SCORE: 99,
    ACRONYM_BASE_SCORE: 49,
    MIN_QUERY_LENGTH_FOR_SUBSTRING: 2,
    MAX_RESULTS: 8
} as const;

type MatchType = 'exact' | 'startsWith' | 'wordBoundary' | 'fuzzy' | 'description' | 'multiWord' | 'substring' | 'acronym';

export const calculateCategoryScore = (category: FishCategory, query: string) => {
    const name: string = category.name.toLowerCase();
    const description: string = category.description?.toLowerCase() || '';
    const searchText: string = `${name} ${description}`;

    // Initialize scoring variables
    let score: number = 0;
    let matchType: MatchType = 'exact';

    // 1. EXACT MATCH (Highest Priority)
    if (name === query) {
        score = SEARCH_CONFIG.EXACT_MATCH_SCORE;
        matchType = 'exact';
    }

    // 2. STARTS WITH MATCH
    else if (name.startsWith(query)) {
        score = SEARCH_CONFIG.STARTS_WITH_BASE_SCORE - (name.length - query.length) * 2;
        matchType = 'startsWith';
    }

    // 3. WORD BOUNDARY MATCH
    else if (new RegExp(`\\b${escapeRegex(query)}`, 'i').test(name)) {
        const matchIndex: number = name.indexOf(query);
        score = SEARCH_CONFIG.WORD_BOUNDARY_BASE_SCORE - (matchIndex * 2);
        matchType = 'wordBoundary';
    }

    // 4. FUZZY/LEVENSHTEIN DISTANCE MATCH
    else {
        const distance: number = levenshteinDistance(query, name);
        const maxLen: number = Math.max(query.length, name.length);
        const similarity: number = (maxLen - distance) / maxLen;

        if (similarity > SEARCH_CONFIG.FUZZY_THRESHOLD) {
            const fuzzyRange: number = SEARCH_CONFIG.FUZZY_MAX_SCORE - SEARCH_CONFIG.FUZZY_BASE_SCORE;
            score = Math.floor(SEARCH_CONFIG.FUZZY_BASE_SCORE + (similarity * fuzzyRange));
            matchType = 'fuzzy';
        }
    }

    // 5. DESCRIPTION MATCH
    if (score === 0 && description && description.includes(query)) {
        const descriptionIndex: number = description.indexOf(query);
        score = SEARCH_CONFIG.DESCRIPTION_BASE_SCORE - descriptionIndex;
        matchType = 'description';
    }

    // 6. MULTI-WORD QUERY SUPPORT
    if (score === 0 && query.includes(' ')) {
        const queryWords: string[] = query.split(/\s+/).filter((word: string): boolean => word.length > 1);
        let wordMatches: number = 0;
        let totalWordScore: number = 0;

        queryWords.forEach((word: string): void => {
            if (searchText.includes(word)) {
                wordMatches++;
                totalWordScore += name.includes(word)
                    ? SEARCH_CONFIG.MULTI_WORD_NAME_BONUS
                    : SEARCH_CONFIG.MULTI_WORD_DESC_BONUS;
            }
        });

        if (wordMatches > 0) {
            const wordMatchRatio: number = wordMatches / queryWords.length;
            score = Math.floor(SEARCH_CONFIG.MULTI_WORD_BASE_SCORE + (wordMatchRatio * 99) + totalWordScore);
            matchType = 'multiWord';
        }
    }

    // 7. PARTIAL/SUBSTRING MATCH
    if (score === 0 && name.includes(query) && query.length > SEARCH_CONFIG.MIN_QUERY_LENGTH_FOR_SUBSTRING) {
        const index: number = name.indexOf(query);
        score = SEARCH_CONFIG.SUBSTRING_BASE_SCORE - index - (name.length - query.length);
        matchType = 'substring';
    }

    // 8. ACRONYM MATCH
    if (score === 0) {
        const acronym: string = name
            .split(/\s+/)
            .map((word: string): string => word[0])
            .join('')
            .toLowerCase();

        if (acronym.includes(query) || query.includes(acronym)) {
            score = SEARCH_CONFIG.ACRONYM_BASE_SCORE - Math.abs(acronym.length - query.length);
            matchType = 'acronym';
        }
    }

    // Return result with proper typing or null for filtering
    return score > 0 ? {
        ...category,
        searchScore: score,
        matchType: matchType,
        highlightText: createHighlight(category.name, query)
    } : null;
};

// Helper function to escape special regex characters
function escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Levenshtein distance algorithm for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = Array(str2.length + 1)
        .fill(null)
        .map((): number[] => Array(str1.length + 1).fill(0));

    for (let i: number = 0; i <= str1.length; i++) {
        matrix[0][i] = i;
    }

    for (let j: number = 0; j <= str2.length; j++) {
        matrix[j][0] = j;
    }

    for (let j: number = 1; j <= str2.length; j++) {
        for (let i: number = 1; i <= str1.length; i++) {
            const substitutionCost: number = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,                    // deletion
                matrix[j - 1][i] + 1,                    // insertion
                matrix[j - 1][i - 1] + substitutionCost // substitution
            );
        }
    }

    return matrix[str2.length][str1.length];
}

// Create highlighted text for display enhancement
function createHighlight(text: string, query: string): string {
    if (!query || query.length < 2) return text;

    const regex: RegExp = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}