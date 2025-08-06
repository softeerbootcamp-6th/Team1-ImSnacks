import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import S from './WeeklyCalendar.style';
import WorkCardWeb from '../workCardWeb/WorkCardWeb';
import { type WorkCardType } from '@/types/workCard.type';

dayjs.locale('ko');

interface WeeklyCalendarProps {
  weekDates: Date[];
  workScheduleDataByDate: Record<string, WorkCardType[]>;
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
            workScheduleDataByDate[dayjs(date).format('YYYY-MM-DD')];

          return (
            <div key={index} css={S.DateContainer}>
              <div css={S.DateInfoContainer}>
                <div css={S.DayNameContainer(dayName)}>{dayName}</div>
                <div css={S.DateNumberContainer(dayName, isToday)}>
                  {dayjs(date).date()}
                </div>
              </div>
              <div css={S.DateWorkContainer}>
                {dayData?.map((work: WorkCardType) => (
                  <WorkCardWeb
                    key={work.id}
                    cropName={work.cropName}
                    workName={work.workName}
                    workTime={work.workTime}
                    isCompleted={work.isCompleted}
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
