import { TIME_LOCALE } from './constants.js';

export class TimeUtil {
    formatter = new Intl.DateTimeFormat(TIME_LOCALE, {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        hour12: false,
        weekday: 'long',
    });

    logger(time: number | Date, seconds = false) {
        if (time instanceof Date) {
            time = time.getTime();
        }

        const parts = this.formatter.formatToParts();
        const hour = find(parts, 'hour');
        const minute = find(parts, 'minute');
        const second = find(parts, 'second');

        return `${hour?.value}:${minute?.value}${seconds ? `:${second?.value}` : ''}`;
    }
}

function find(
    parts: Intl.DateTimeFormatPart[],
    thing: Intl.DateTimeFormatPartTypes,
) {
    return parts.find((part) => part.type === thing);
}
