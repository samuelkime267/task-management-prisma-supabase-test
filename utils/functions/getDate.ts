export default function getDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const aWeekLater = new Date();
  aWeekLater.setDate(aWeekLater.getDate() + 7);
  aWeekLater.setHours(0, 0, 0, 0);
  const aMonthLater = new Date();
  aMonthLater.setDate(aMonthLater.getDate() + 30);
  aMonthLater.setHours(0, 0, 0, 0);
  const aYearLater = new Date();
  aYearLater.setDate(aYearLater.getDate() + 365);
  aYearLater.setHours(0, 0, 0, 0);
  const past7Days = new Date();
  past7Days.setDate(past7Days.getDate() - 7);
  past7Days.setHours(0, 0, 0, 0);
  const now = new Date();

  return {
    today,
    tomorrow,
    aWeekLater,
    aMonthLater,
    aYearLater,
    past7Days,
    now,
  };
}
