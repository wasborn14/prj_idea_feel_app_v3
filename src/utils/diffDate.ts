export const getStartAndEndDate = (baseDate: Date, isSelectWeek: boolean) => {
  const thisYear = baseDate.getFullYear()
  const thisMonth = baseDate.getMonth()
  if (isSelectWeek) {
    const date = baseDate.getDate()
    const dayNum = baseDate.getDay()

    const thisSunday = date - dayNum
    const thisSaturday = thisSunday + 6
    const startDate = new Date(thisYear, thisMonth, thisSunday).toISOString()
    const endDate = new Date(thisYear, thisMonth, thisSaturday, 23, 59, 59, 999).toISOString()
    return { startDate, endDate }
  } else {
    const startDate = new Date(thisYear, thisMonth, 1).toISOString()
    const endDate = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59, 999).toISOString()
    return { startDate, endDate }
  }
}
