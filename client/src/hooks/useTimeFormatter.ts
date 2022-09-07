import { formatDate, formatTimeAgo } from '@app/utils/dateTimeFormatter';
import { useMemo } from 'react';
import useTimeGreaterThan from './useTimeGreaterThan';

function useTimeFormatter(time: string) {
  const { isMoreThan3Days, isMoreThanAYear } = useTimeGreaterThan();
  return useMemo(() => {
    if (isMoreThanAYear(time))
      return formatDate(new Date(time), { year: true });

    if (isMoreThan3Days(time)) return formatDate(new Date(time));

    return formatTimeAgo(new Date(time));
  }, []);
}

export default useTimeFormatter;
