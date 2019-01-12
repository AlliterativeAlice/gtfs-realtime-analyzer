import { TranslatedString } from '../classes/FeedMessage';

export function getEnumKeyFromValue(value: number | undefined, enumerable: any): string {
    if (value === null || value === undefined) { return "N/A" };
    return enumerable[value];
}

export function formatTimestamp(timestamp?: number): string {
    if (!timestamp) { return "N/A"; }
    return `${new Date(timestamp * 1000).toLocaleString()} (${timestamp})`;
}

export function getTranslatedStringVal(language: string | null, tStr?: TranslatedString): string {
    if (!tStr || !language) { return 'N/A'; }
    const matchingTranslation = tStr.translation.filter(t => t.language === language);
    if (matchingTranslation.length > 0) { return matchingTranslation[0].text; }
    return 'N/A';
}