export function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    if (userAgent.indexOf('Chrome') > -1) {
        browserName = 'Chrome';
    }
    else if (userAgent.indexOf('Safari') > -1) {
        browserName = 'Safari';
    }
    else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Firefox';
    }
    else if (userAgent.indexOf('Edge') > -1) {
        browserName = 'Edge';
    }
    return browserName;
}
export function getOSInfo() {
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';
    if (userAgent.indexOf('Win') > -1) {
        os = 'Windows';
    }
    else if (userAgent.indexOf('Mac') > -1) {
        os = 'macOS';
    }
    else if (userAgent.indexOf('Linux') > -1) {
        os = 'Linux';
    }
    else if (userAgent.indexOf('Android') > -1) {
        os = 'Android';
    }
    else if (userAgent.indexOf('iPhone') > -1) {
        os = 'iOS';
    }
    return os;
}
export function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
export function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
export function isOnline() {
    return navigator.onLine;
}
export function getScreenSize() {
    return `${window.screen.width}x${window.screen.height}`;
}
export function getDeviceTime() {
    const currentDate = new Date();
    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
}
