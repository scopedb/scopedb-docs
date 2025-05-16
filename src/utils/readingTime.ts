import readingTime from 'reading-time';

export function getReadingTime(text: string): string {
  const result = readingTime(text);
  return result.text;
}
