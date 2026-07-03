// Helpers for reasoning about term dates that admins enter as free text,
// e.g. date_range "26 July 2026 - 13 September 2026" and subtitles like
// "Term 3 - Sunday 9:00am". Parsing is defensive: anything unrecognised
// returns 'unknown' so pages fall back to neutral wording instead of
// showing a wrong status.

export type TermStatus = 'upcoming' | 'started' | 'ended' | 'unknown';

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(text: string): Date | null {
  const match = text.trim().match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+),?\s+(\d{4})$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = MONTHS[match[2].slice(0, 3).toLowerCase()];
  const year = parseInt(match[3], 10);
  if (month === undefined || day < 1 || day > 31) return null;
  return new Date(year, month, day);
}

export function getTermStatus(dateRange: string | undefined | null, now: Date = new Date()): TermStatus {
  if (!dateRange) return 'unknown';
  const parts = dateRange.split(/\s*[-–—]\s*/);
  if (parts.length !== 2) return 'unknown';
  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  if (!start || !end) return 'unknown';
  end.setHours(23, 59, 59, 999);
  if (now < start) return 'upcoming';
  if (now > end) return 'ended';
  return 'started';
}

/** Extracts "Term 3" from a subtitle like "Term 3 - Sunday 9:00am". */
export function extractTermLabel(subtitle: string | undefined | null): string | null {
  const match = subtitle?.match(/term\s*\d+/i);
  return match ? match[0].replace(/\s+/, ' ') : null;
}
