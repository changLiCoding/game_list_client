export function remove<T>(array: T[], item: T): T[] {
  return array.filter((element) => element !== item);
}
