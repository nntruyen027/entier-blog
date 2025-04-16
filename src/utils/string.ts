export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export const truncate = (desc = '', maxLength = 210) => {
  if (desc == null) return '';
  if (desc.length <= maxLength) return desc;
  return desc.slice(0, maxLength).trim() + '...';
};
