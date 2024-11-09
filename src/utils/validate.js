export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}
export function validatePhoneNumber(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
}
export function validateUsername(username) {
    const re = /^[a-zA-Z0-9]{3,15}$/;
    return re.test(username);
}
export function validateURL(url) {
    const re = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    return re.test(url);
}
export function validateInteger(value) {
    const re = /^[-+]?\d+$/;
    return re.test(value);
}
export function validateFloat(value) {
    const re = /^[+-]?\d+(\.\d+)?$/;
    return re.test(value);
}
export function validateMinLength(value, minLength) {
    return value.length >= minLength;
}
export function validateMaxLength(value, maxLength) {
    return value.length <= maxLength;
}
export function validateAlphabets(value) {
    const re = /^[A-Za-z]+$/;
    return re.test(value);
}
export function validateNumeric(value) {
    const re = /^[0-9]+$/;
    return re.test(value);
}
export function validateAlphanumeric(value) {
    const re = /^[A-Za-z0-9]+$/;
    return re.test(value);
}
export function validateNonEmpty(value) {
    return value.trim().length > 0;
}
