import { clsx } from "clsx";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatMonthYear = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMMM yyyy', { locale: ar })
}

export const formatDayMonthYear = (date) => {
  if (!date) return ''
  return format(date, 'dd MMMM yyyy', { locale: ar })
}

export const formatDateWithTime = (date) => {
  if (!date) return ''
  return format(new Date(date), 'd MMMM yyyy hh:mm a', { locale: ar })
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function getDayName(date) {
  const DaysNames = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
  return DaysNames[new Date(date).getDay()];
}
