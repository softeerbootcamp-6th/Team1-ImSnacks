import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import S from './WeeklyCalendar.style';
import WorkCardWeb from '../workCardWeb/WorkCardWeb';
import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';

dayjs.locale('ko');

interface WeeklyCalendarProps {
  weekDates: Date[];
}

const WeeklyCalendar = ({ weekDates }: WeeklyCalendarProps) => {
  return (
    <div css={S.WeeklyCalendar}>
      <div css={S.DayContainer}>
        {weekDates.map((date, index) => {
          const isToday = dayjs(date).isSame(dayjs(), 'day');
          const dayName = dayjs(date).format('dd');
          const workScheduleData = WORK_SCHEDULE_DATA.filter(
            work => work.date === dayjs(date).format('YYYY-MM-DD')
          );

          return (
            <div key={index} css={S.DateContainer}>
              <div css={S.DateInfoContainer}>
                <div css={S.DayNameContainer(dayName)}>{dayName}</div>
                <div css={S.DateNumberContainer(dayName, isToday)}>
                  {dayjs(date).date()}
                </div>
              </div>
              <div css={S.DateWorkContainer}>
                {workScheduleData.map(work => (
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
