export function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const options = {};
    if (format === 'YYYY-MM-DD') {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
    }
    else if (format === 'MM/DD/YYYY') {
        options.month = '2-digit';
        options.day = '2-digit';
        options.year = 'numeric';
    }
    else if (format === 'DD/MM/YYYY') {
        options.day = '2-digit';
        options.month = '2-digit';
        options.year = 'numeric';
    }
    return new Intl.DateTimeFormat('en-GB', options).format(d);
}
export function getCurrentYear() {
    return new Date().getFullYear();
}
