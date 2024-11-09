export function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
export function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}
