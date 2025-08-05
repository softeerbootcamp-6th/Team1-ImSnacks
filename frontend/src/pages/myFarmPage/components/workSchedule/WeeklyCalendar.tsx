import { css } from '@emotion/react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Spacing } from '@/styles/spacing';
import { GrayScale, ColorStatus, ColorPrimary } from '@/styles/colors';
import { Typography } from '@/styles/typography';

// 한국어 locale 설정
dayjs.locale('ko');

interface WeeklyCalendarProps {
  currentDate: Date;
  weekDates: Date[];
  dayNames: string[];
}

const WeeklyCalendar = ({
  currentDate,
  weekDates,
  dayNames,
}: WeeklyCalendarProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${Spacing.Spacing200};
      `}
    >
      {/* 요일 헤더 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: ${Spacing.Spacing100};
          padding: ${Spacing.Spacing200} 0;
        `}
      >
        {dayNames.map(dayName => (
          <div
            key={dayName}
            css={css`
              text-align: center;
              ${Typography.Body_S_400}
              color: ${dayName === '일요일'
                ? ColorStatus.Global.Red
                : dayName === '토요일'
                ? ColorPrimary.B700
                : GrayScale.G700};
              padding: ${Spacing.Spacing100};
            `}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: ${Spacing.Spacing100};
        `}
      >
        {weekDates.map((date, index) => {
          const isToday = dayjs(date).isSame(dayjs(), 'day');
          const isCurrentMonth = dayjs(date).isSame(
            dayjs(currentDate),
            'month'
          );

          return (
            <div
              key={index}
              css={css`
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                ${Typography.Body_L_500}
                color: ${isCurrentMonth ? GrayScale.G900 : GrayScale.G400};
                background-color: ${isToday ? GrayScale.G100 : 'transparent'};
                border: ${isToday ? `1px solid ${GrayScale.G300}` : 'none'};
                transition: all 0.2s ease;

                &:hover {
                  background-color: ${GrayScale.G50};
                }
              `}
            >
              {dayjs(date).date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
