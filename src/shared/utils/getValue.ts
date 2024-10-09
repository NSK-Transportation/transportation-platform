export function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}