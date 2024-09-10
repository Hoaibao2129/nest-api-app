export function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return Object.keys(value).length === 0;
    }
  }
  if (typeof value === 'string') {
    return value.length === 0;
  }
  return false;
}
