/**
 * Складывает два числовых значения. Если одно из значений отсутствует, возвращает другое.
 * Если оба значения отсутствуют, возвращает 0.
 *
 * @param value1 - Первое числовое значение, которое нужно сложить
 * @param value2 - Второе числовое значение, которое нужно сложить
 * @returns Сумма двух значений, или одно из значений, если другое отсутствует. Возвращает 0, если оба значения отсутствуют.
 */

export function getSumValues(value1?: number, value2?: number): number {
  if (value1 !== undefined && value2 !== undefined) {
    return value1 + value2;
  } else if (value1 !== undefined) {
    return value1;
  } else if (value2 !== undefined) {
    return value2;
  } else {
    return 0;
  }
}
