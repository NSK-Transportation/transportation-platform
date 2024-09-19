/**
 * Форматирование номера телефона с использованием регулярных выражений
 *
 * @param phone - Введенный пользователем номер телефона (без форматирования)
 * @returns Отформатированный телефонный номер
 */
export const getFormatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  const patterns = [
    { regex: /^(\d{0,3})$/, format: "$1" },
    { regex: /^(\d{3})(\d{0,3})$/, format: "($1) $2" },
    { regex: /^(\d{3})(\d{3})(\d{0,2})$/, format: "($1) $2-$3" },
    { regex: /^(\d{3})(\d{3})(\d{2})(\d{0,2})$/, format: "($1) $2-$3-$4" },
  ];

  for (const { regex, format } of patterns) {
    if (regex.test(cleaned)) {
      return `${cleaned.replace(regex, format)}`;
    }
  }

  return `${cleaned}`;
};
