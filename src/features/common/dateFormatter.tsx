export function DateFormatter(date: Date){
  //日付の整形 date型->string型
  const formatter = new Intl.DateTimeFormat("en-CA"); // → "YYYY-MM-DD"
  return date ? formatter.format(date) : "";
  
}