import { formatDate, formatTimeAgo } from '@app/utils/dateTimeFormatter';
import { isMoreThan3Days, isMoreThanAYear } from '@app/utils/isGreaterThan';
import { useMemo } from 'react';

function useTimeFormatter(time?: string | null) {
  return useMemo(() => {
    if (time == null) return;
    if (isMoreThanAYear(time))
      return formatDate(new Date(time), { year: true });

    if (isMoreThan3Days(time)) return formatDate(new Date(time));

    return formatTimeAgo(new Date(time));
  }, [time]);
}

export default useTimeFormatter;
