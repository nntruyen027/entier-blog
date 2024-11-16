import { t } from 'i18next';

export function formatCurrency(amount: number, locale: string = 'vi-VN', currency: string = 'VND'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}

export function formatNumberToShortenedForm(value: number): string {
  if (value >= 1e9) {
    // Billions (e.g., 1,000,000,000 -> 1b)
    return `${(value / 1e9).toFixed(1).replace(/\.0$/, '')}b`;
  } else if (value >= 1e6) {
    // Millions (e.g., 1,000,000 -> 1m)
    return `${(value / 1e6).toFixed(1).replace(/\.0$/, '')}m`;
  } else if (value >= 1e3) {
    // Thousands (e.g., 1,000 -> 1k)
    return `${(value / 1e3).toFixed(1).replace(/\.0$/, '')}k`;
  }
  // Numbers less than 1k are returned as-is
  return value.toString();
}

export function formatNumberToWords(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1).replace(/\.0$/, '')} billion`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1).replace(/\.0$/, '')} million`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1).replace(/\.0$/, '')} thousand`;
  }
  return value.toString();
}

export function formatNumberToWordsLocalized(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1).replace(/\.0$/, '')} ${t('units.billion')}`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1).replace(/\.0$/, '')} ${t('units.million')}`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1).replace(/\.0$/, '')} ${t('units.thousand')}`;
  }
  return value.toString();
}
