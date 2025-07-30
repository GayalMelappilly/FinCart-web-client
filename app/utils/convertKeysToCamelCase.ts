function toCamelCase(str: string): string {
  return str.replace(/[_-](\w)/g, (_, letter: string) => letter.toUpperCase());
}

export function convertKeysToCamelCase<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item)) as T;
  }

  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};

    Object.entries(obj).forEach(([key, value]) => {
      const camelKey = toCamelCase(key);
      newObj[camelKey] = convertKeysToCamelCase(value);
    });

    return newObj as T;
  }

  return obj as T;
}
