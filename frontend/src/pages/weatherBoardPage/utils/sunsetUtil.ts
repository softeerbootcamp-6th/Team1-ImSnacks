// "HH:mm" → 분 단위 환산
export const toMinutes = (t: string) => {
  const [h, m = '0'] = t.split(':');
  return Number(h) * 60 + Number(m);
};

export const getSunPositionNow = (
  startTime: string,
  endTime: string,
  now = new Date()
) => {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  if (start === end) return nowMin >= end ? 100 : 0;

  if (nowMin < start) return -1;
  if (nowMin > end) return 101;

  return ((nowMin - start) / (end - start)) * 100;
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
