import moment from 'moment';

export function formatDate(date: string, format: string = 'YYYY-MM-DD'): string {
  const d = new Date(date);

  const options: Intl.DateTimeFormatOptions = {};

  if (format === 'YYYY-MM-DD') {
    options.year = 'numeric';
    options.month = '2-digit';
    options.day = '2-digit';
  } else if (format === 'MM/DD/YYYY' || format === 'MM-DD-YYYY') {
    options.month = '2-digit';
    options.day = '2-digit';
    options.year = 'numeric';
  } else if (format === 'DD/MM/YYYY' || format === 'DD-MM-YYYY') {
    options.day = '2-digit';
    options.month = '2-digit';
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat('en-GB', options).format(d);
}

export function conventedToISOString(value, format): string {
  return moment(value, format).toISOString();
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function formatToFullTime(date: string): string {
  const formatedDate = new Date(date);

  return formatedDate.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
