export const filenameRegex = (filename) => {
  if (filename) {
    const regExpression = new RegExp('^.+(.txt)$');
    if (!regExpression.test(filename)) {
      return `${filename}.txt`;
    }
    return filename;
  }
  return '';
};

export const descriptionRegex = (description): boolean => {
  if (description) {
    const regExpression = new RegExp('^((Add|Correct|Change|Remove|Delete) .+)$');
    return regExpression.test(description);
  }
  return false;
};
