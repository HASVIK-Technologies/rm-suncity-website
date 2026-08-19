/**
 * The Indian academic session runs April → March. So "today" being in, say,
 * Jan–Mar still belongs to the session that started the previous April.
 */
export function getAcademicYear(date: Date = new Date()): number {
  const month = date.getMonth(); // 0 = Jan
  const year = date.getFullYear();
  return month < 3 ? year - 1 : year; // Jan/Feb/Mar (0,1,2) belong to the previous session
}

/** 2026 -> "2026-27" */
export function formatAcademicYear(year: number): string {
  const nextYearSuffix = String((year + 1) % 100).padStart(2, "0");
  return `${year}-${nextYearSuffix}`;
}
