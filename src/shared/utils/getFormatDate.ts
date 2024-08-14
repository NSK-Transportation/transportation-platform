/**
 * Преобразует дату из формата "YYYY-MM-DD" в указанный формат
 * @param date - дата в формате "YYYY-MM-DD"
 * @param format - формат вывода: "day", "month" или "year"
 * @returns день, месяц или год в зависимости от указанного формата
 */

export const getFormatDate = (date: string, format: "day" | "month" | "year"): string => {
  const [year, month, day] = date.split("-");

  switch (format) {
    case "day":
      return day;
    case "month":
      return month;
    case "year":
      return year;
    default:
      return "";
  }
};
