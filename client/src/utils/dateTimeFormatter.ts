const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
];

export function formatDate(date: Date, options?: { year?: boolean }) {
  return new Intl.DateTimeFormat('id', {
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: options?.year ? 'numeric' : undefined,
  }).format(date);
}

export function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return new Intl.RelativeTimeFormat('id', { numeric: 'auto' }).format(
        Math.round(duration),
        division.name
      );
    }
    duration /= division.amount;
  }
  return '';
}
