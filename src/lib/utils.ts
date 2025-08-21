import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/dateFormatter.ts
export function formatDateToYYYYMMDD(date: Date): string {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replaceAll("/", "-");
}

//今日の日付を "YYYY-MM-DD" 形式で返す
export const getTodayStr = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
}


//日付が今日より前かどうかを判定
//@param date Dateオブジェクト
export const isPastDate = (date: Date): boolean => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d < todayOnly;
}

 //Dateオブジェクトを "YYYY-MM-DD" 形式の文字列に変換
export const formatDateToStr = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}