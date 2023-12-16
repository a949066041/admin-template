import type { DatePickerProps } from 'naive-ui'
import dayjs from 'dayjs'

const YEAR = 'yyyy'
const MONTH = 'MM'
const DAY = 'dd'
const HOUR = 'HH'
const MINUTE = 'mm'
const SECOND = 'ss'
const SPLIT = '-'

export const DATE_FORMAT: Record<Required<DatePickerProps>['type'], string> = {
  date: [YEAR, MONTH, DAY].join(SPLIT),
  datetime: [YEAR, MONTH, DAY, HOUR, MINUTE, SECOND].join(SPLIT),
  daterange: [YEAR, MONTH, DAY].join(SPLIT),
  datetimerange: [YEAR, MONTH, DAY, HOUR, MINUTE, SECOND].join(SPLIT),
  month: MONTH,
  year: YEAR,
  quarter: SECOND,
  monthrange: MONTH,
  quarterrange: SECOND,
  yearrange: YEAR,
}

export const NOW_DAY = dayjs().toDate().getTime()
export const AUTO_COMPLETE_START = ' 00:00:00'
export const AUTO_COMPLETE_END = ' 23:59:59'

export const SHORTCUTS: Record<string, number> = {
  today: dayjs().toDate().getTime(),
  yesterday: dayjs().subtract(1, 'day').toDate().getTime(),
  thisWeek: dayjs().startOf('week').toDate().getTime(),
  lastWeek: dayjs().subtract(1, 'week').toDate().getTime(),
  thisMonth: dayjs().startOf('month').toDate().getTime(),
  lastMonth: dayjs().subtract(1, 'month').toDate().getTime(),
  thisYear: dayjs().startOf('year').toDate().getTime(),
  lastYear: dayjs().startOf('year').subtract(1, 'year').toDate().getTime(),
}
