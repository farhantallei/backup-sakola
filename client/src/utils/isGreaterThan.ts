export function isMoreThan3Days(date: string) {
  return new Date().getTime() - new Date(date).getTime() > 1000 * 3600 * 24 * 3;
}

export function isMoreThanAYear(date: string) {
  return new Date(date).getFullYear() > new Date().getFullYear();
}
