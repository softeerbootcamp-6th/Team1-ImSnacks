import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import S from './WeeklyCalendar.style';
import WorkCardWeb from '../workCardWeb/WorkCardWeb';
import type { WorkCardData } from '@/types/openapiGenerator';
import { WORK_CHIP_TYPES } from '@/types/workChip.type';

dayjs.locale('ko');

interface WeeklyCalendarProps {
  weekDates: Date[];
  workScheduleDataByDate: Record<string, WorkCardData[]>;
}

const WeeklyCalendar = ({
  weekDates,
  workScheduleDataByDate,
}: WeeklyCalendarProps) => {
  return (
    <div css={S.WeeklyCalendar}>
      <div css={S.DayContainer}>
        {weekDates.map((date, index) => {
          const isToday = dayjs(date).isSame(dayjs(), 'day');
          const dayName = dayjs(date).format('dd');
          const dayData =
            workScheduleDataByDate[dayjs(date).format('YYYY-MM-DD')] || [];

          return (
            <div key={index} css={S.DateContainer}>
              <div css={S.DateInfoContainer}>
                <div css={S.DayNameContainer(dayName)}>{dayName}</div>
                <div css={S.DateNumberContainer(dayName, isToday)}>
                  {dayjs(date).date()}
                </div>
              </div>
              <div css={S.DateWorkContainer}>
                {dayData.map((work: WorkCardData) => (
                  <WorkCardWeb
                    key={work.myWorkId}
                    cropName={work.myCropName ?? ''}
                    workName={work.myWorkName ?? ''}
                    workTime={work.myWorkTime ?? ''}
                    status={work.status ?? WORK_CHIP_TYPES.INCOMPLETED}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
