import { createElement } from 'react';
import { TranslatedString } from '../classes/FeedMessage';

export function getEnumKeyFromValue(value: number | undefined, enumerable: any): string {
    if (value === null || value === undefined) { return "N/A" };
    return enumerable[value];
}

export function formatTimestamp(timestamp?: number): JSX.Element {
    let timestampStr = '';
    if (!timestamp || isNaN(timestamp)) { timestampStr = "N/A"; }
    else { timestampStr = `${new Date(timestamp * 1000).toLocaleString()} (${timestamp})`; }
    return createElement('span', {title: timestampStr}, timestampStr);
}

export function getTranslatedStringVal(language: string | null, tStr?: TranslatedString): string {
    if (!tStr || !language) { return 'N/A'; }
    const matchingTranslation = tStr.translation.filter(t => t.language === language);
    if (matchingTranslation.length > 0) { return matchingTranslation[0].text; }
    return 'N/A';
}

export function formatNumber(number?: number): string {
    if (number || number === 0) return number.toString();
    return 'N/A';
}