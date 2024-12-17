export function removeSpecialChars(string) {
  return string.replaceAll(/[;<>/]/g, '');
}