export const BASE = 'https://dog.ceo/api';

export async function isUrl(value: string) {
  try {
    return value.startsWith('http://') || value.startsWith('https://');
  } catch {
    return false;
  }
}
