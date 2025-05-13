export default function formatTime(time: number, isMilliseconds = false) {
  const totalSeconds = isMilliseconds
    ? Math.floor(time / 1000)
    : Math.floor(time);

  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const paddedHrs = String(hrs).padStart(2, "0");
  const paddedMins = String(mins).padStart(2, "0");
  const paddedSecs = String(secs).padStart(2, "0");

  return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
}
