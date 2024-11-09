export function formatCurrency(amount: number, locale: string = 'vi-VN', currency: string = 'VND'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

