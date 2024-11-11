export function saveToStorage(name, item) {
  const stringified = JSON.stringify(item);
  localStorage.setItem(name, stringified)
}

export function getFromStorage(item) {
  const item1 = localStorage.getItem(item);
  const parsed = JSON.parse(item1)

  return parsed;
}

export function removeFromStorage(item) {
  localStorage.removeItem(item);
};
