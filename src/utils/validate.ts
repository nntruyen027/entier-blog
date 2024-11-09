export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const re = /^[0-9]{10,11}$/; 
  return re.test(phone);
}

export function validateUsername(username: string): boolean {
  const re = /^[a-zA-Z0-9]{3,15}$/;
  return re.test(username);
}

export function validateURL(url: string): boolean {
  const re = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
  return re.test(url);
}

export function validateInteger(value: string): boolean {
  const re = /^[-+]?\d+$/;
  return re.test(value);
}

export function validateFloat(value: string): boolean {
  const re = /^[+-]?\d+(\.\d+)?$/;
  return re.test(value);
}

export function validateMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function validateMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

export function validateAlphabets(value: string): boolean {
  const re = /^[A-Za-z]+$/;
  return re.test(value);
}

export function validateNumeric(value: string): boolean {
  const re = /^[0-9]+$/;
  return re.test(value);
}

export function validateAlphanumeric(value: string): boolean {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(value);
}

export function validateNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

