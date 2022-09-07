import { formatDate, formatTimeAgo } from '@app/utils/dateTimeFormatter';
import { isMoreThan3Days, isMoreThanAYear } from '@app/utils/isGreaterThan';
import { useMemo } from 'react';

function useTimeFormatter(time: string) {
  return useMemo(() => {
    if (isMoreThanAYear(time))
      return formatDate(new Date(time), { year: true });

    if (isMoreThan3Days(time)) return formatDate(new Date(time));

    return formatTimeAgo(new Date(time));
  }, []);
}

export default useTimeFormatter;
