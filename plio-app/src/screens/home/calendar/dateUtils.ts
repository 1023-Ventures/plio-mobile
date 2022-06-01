export function getBegOfMonth(d: Date | undefined = undefined) {
    const d2 = d ? new Date(d) : new Date();
    d2.setDate(1);
    return d2;
}

export function getEndOfMonth(d: Date) {
    const d2 = new Date(d);
    d2.setMonth(d2.getMonth() + 1);
    d2.setDate(d2.getDate() - 1);
    return d2;
}

export function addSeconds(d: Date, seconds: number) {
    const d2 = new Date(d);
    d2.setSeconds(d2.getSeconds() + seconds);
    return d2;
}

export function timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

export function dateToLocal(d: Date) {
    try {
        return d.toLocaleDateString();
    } catch {
        console.warn('error converting to localDateString', d);
        return '';
    }
}
