/**
 * Генерирует уникальный идентификатор.
 *
 * Функция использует `crypto.randomUUID()`, чтобы сгенерировать
 * строку, которая является уникальной в глобальном масштабе.
 * Идентификатор соответствует стандарту UUID версии 4.
 *
 * @returns {string} Уникальный идентификатор в формате UUID.
 *
 * @example
 * const id = getUniqueId();
 * console.log(id); // "123e4567-e89b-12d3-a456-426614174000"
 */

export function getUniqueId(): string {
  return crypto.randomUUID();
}
