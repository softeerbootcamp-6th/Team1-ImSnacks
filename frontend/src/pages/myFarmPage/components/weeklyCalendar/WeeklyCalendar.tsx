import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import S from './WeeklyCalendar.style';
import WorkCardWeb from '../workCardWeb/WorkCardWeb';
import type { WorkCardData } from '@/types/openapiGenerator';
import { WORK_CHIP_TYPES, type WorkChipType } from '@/types/workChip.type';
import { useTheme } from '@emotion/react';

interface WeeklyCalendarProps {
  weekDates: Date[];
  workScheduleDataByDate: Record<string, WorkCardData[]>;
  isExpanded: boolean;
  hasMoreWorks: boolean;
  handleCheckButton: (
    id: number,
    status: WorkChipType,
    dateKey: string
  ) => void;
}

const WeeklyCalendar = ({
  weekDates,
  workScheduleDataByDate,
  isExpanded,
  hasMoreWorks,
  handleCheckButton,
}: WeeklyCalendarProps) => {
  const theme = useTheme();
  return (
    <>
      <div css={S.WeeklyCalendar(hasMoreWorks, isExpanded)}>
        <div css={S.DayContainer}>
          {weekDates.map((date, index) => {
            const isToday = dayjs(date).isSame(dayjs(), 'day');
            const dayName = dayjs(date).format('dd');
            const dateKey = dayjs(date).format('YYYY-MM-DD');
            const dayData = workScheduleDataByDate[dateKey] || [];

            return (
              <div key={index} css={S.DateContainer}>
                <div css={S.DateInfoContainer}>
                  <div css={S.DayNameContainer(dayName)}>{dayName}</div>
                  <div css={S.DateNumberContainer(dayName, isToday, theme)}>
                    {dayjs(date).date()}
                  </div>
                </div>
                <div css={S.DateWorkContainer}>
                  {dayData.map((work: WorkCardData) => (
                    <WorkCardWeb
                      key={work.myWorkId}
                      id={work.myWorkId ?? 0}
                      cropName={work.myCropName ?? ''}
                      workName={work.myWorkName ?? ''}
                      workTime={work.myWorkTime ?? ''}
                      status={work.status ?? WORK_CHIP_TYPES.INCOMPLETED}
                      dateKey={dateKey}
                      handleCheckButton={handleCheckButton}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WeeklyCalendar;
