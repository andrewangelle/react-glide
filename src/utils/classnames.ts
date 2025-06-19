function isString(value: string | boolean): value is string {
  return Boolean(typeof value === 'string' && value?.trim());
}

export function classnames(...argz: (string | boolean)[]) {
  let result = '';

  for (const arg of argz) {
    if (isString(arg)) {
      result += ` ${arg.trim()}`;
    }
  }

  return result;
}
