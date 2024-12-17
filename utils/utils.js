function removeSpecialChars(string) {
  return string.replaceAll(/[;<>/]/g, '');
}

module.exports = {
  removeSpecialChars,
} 