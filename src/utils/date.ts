export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {};

  if (format === 'YYYY-MM-DD') {
    options.year = 'numeric';
    options.month = '2-digit';
    options.day = '2-digit';
  } else if (format === 'MM/DD/YYYY') {
    options.month = '2-digit';
    options.day = '2-digit';
    options.year = 'numeric';
  } else if (format === 'DD/MM/YYYY') {
    options.day = '2-digit';
    options.month = '2-digit';
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat('en-GB', options).format(d);
}


export function getCurrentYear(): number {
  return new Date().getFullYear();
}

