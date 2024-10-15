/**
 * Форматирование номера телефона по заданному паттерну
 *
 * @param phone - Введенный пользователем номер телефона (без форматирования)
 * @param pattern - Паттерн для форматирования - "X" для обозначения цифр.
 * @returns Отформатированный телефонный номер
 */
export const getFormatPhoneNumber = (phone: string, pattern: string): string => {
  const cleaned = phone?.replace(/\D/g, "");

  let formatted = "";
  let phoneIndex = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (["X", "x"].includes(pattern[i])) {
      if (phoneIndex < cleaned?.length) {
        formatted += cleaned[phoneIndex];
        phoneIndex++;
      } else {
        break;
      }
    } else {
      formatted += pattern[i];
    }
  }

  return formatted;
};
