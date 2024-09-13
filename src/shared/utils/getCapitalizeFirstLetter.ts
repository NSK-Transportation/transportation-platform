/**
 * Функция `capitalizeFirstLetterOfEachWord` принимает строку и возвращает новую строку,
 * где первая буква каждого слова преобразована в верхний регистр, а остальные буквы остаются без изменений.
 *
 * @param {string} string - Исходная строка, которую нужно преобразовать.
 * @returns {string} - Преобразованная строка с заглавной первой буквой каждого слова.
 *
 * @example
 * capitalizeFirstLetterOfEachWord("hello"); // Возвращает "Hello"
 */
export function getCapitalizeFirstLetter(string: string): string {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
