export const setToLocalStorage = (key: string, value: unknown) => {
  const transformedValue = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, transformedValue);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const getJSONFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
