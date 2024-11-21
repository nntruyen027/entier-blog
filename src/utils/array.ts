export function toggleSelection<T>(prevSelected: T[], item: T): T[] {
  return prevSelected.includes(item)
    ? prevSelected.filter((selectedItem) => selectedItem !== item) // Remove if exists
    : [...prevSelected, item];
}
