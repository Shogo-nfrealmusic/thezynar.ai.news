import { addDays, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

/** 日付の区切りに使うタイムゾーン（例: 日本なら Asia/Tokyo） */
export function getNewsDayTimezone(): string {
  return process.env.NEWS_DAY_TIMEZONE ?? "Asia/Tokyo";
}

/** そのタイムゾーンでの「今日」の [開始, 翌日0時) を UTC Date で返す */
export function getNewsDayRangeUtc(now = new Date()): {
  start: Date;
  endExclusive: Date;
} {
  const tz = getNewsDayTimezone();
  const zoned = toZonedTime(now, tz);
  const dayStartLocal = startOfDay(zoned);
  const start = fromZonedTime(dayStartLocal, tz);
  const nextLocal = addDays(dayStartLocal, 1);
  const endExclusive = fromZonedTime(nextLocal, tz);
  return { start, endExclusive };
}

export function isInNewsDayRange(
  isoUtc: string,
  range: { start: Date; endExclusive: Date }
): boolean {
  const t = new Date(isoUtc);
  return t >= range.start && t < range.endExclusive;
}
