import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';

const updateBlockWorkTime = (
  block: WorkBlockType,
  position: { x: number; y: number },
  px: number
) => {
  const now = dayjs();

  // 현재 시간을 기준으로 x 좌표를 시간으로 변환
  // x가 0이면 현재 시간, 음수면 과거 시간, 양수면 미래 시간
  const relativeHours = position.x / px;
  const relativeMinutes = Math.round((position.x % px) * 0.6);

  // 현재 시간에 상대적 시간을 더해서 새로운 시작 시간 계산
  const newStartTime = now
    .add(relativeHours, 'hour')
    .add(relativeMinutes, 'minute');

  const originalStartTime = dayjs(block.startTime);
  const originalEndTime = dayjs(block.endTime);

  // 날짜가 다른 경우를 고려하여 duration 계산
  let durationMinutes = originalEndTime.diff(originalStartTime, 'minute');

  // 만약 duration이 음수라면 (다음날로 넘어가는 경우)
  if (durationMinutes < 0) {
    // 시작 시간과 종료 시간의 시간만 비교
    const startHour = originalStartTime.hour();
    const startMinute = originalStartTime.minute();
    const endHour = originalEndTime.hour();
    const endMinute = originalEndTime.minute();

    const startTotalMinutes = startHour * 60 + startMinute;
    let endTotalMinutes = endHour * 60 + endMinute;

    // 종료 시간이 시작 시간보다 작다면 24시간 추가
    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    durationMinutes = endTotalMinutes - startTotalMinutes;
  }

  const newEndTime = newStartTime.add(durationMinutes, 'minute');

  return {
    ...block,
    position,
    startTime: newStartTime.toISOString(),
    endTime: newEndTime.toISOString(),
    workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format('HH:mm')}`,
  };
};

export default updateBlockWorkTime;
