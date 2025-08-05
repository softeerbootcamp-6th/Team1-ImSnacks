import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import { GrayScale, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { BorderRadius } from '@/styles/borderRadius';
import {
  IC24NonArrowLeftIcon,
  IC24NonArrowRightIcon,
} from '@/assets/icons/flat';

interface WeekNavigatorProps {
  weekLabel: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const WeekNavigator = ({
  weekLabel,
  onPreviousWeek,
  onNextWeek,
}: WeekNavigatorProps) => {
  return (
    <div
      css={css`
        display: flex;
        height: 32px;
        align-items: center;
        justify-content: space-between;

        background-color: ${Opacity.White.W300};
        ${Typography.Body_S_400}
        padding: ${Spacing.Spacing200};
        gap: ${Spacing.Spacing200};
        border-radius: ${BorderRadius.Base.Hard};
      `}
    >
      <button
        onClick={onPreviousWeek}
        css={css`
          background: none;
          border: none;
          color: ${GrayScale.White};
          cursor: pointer;
          padding: ${Spacing.Spacing100};
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}
      >
        <IC24NonArrowLeftIcon width={24} height={24} />
      </button>
      <span>{weekLabel}</span>
      <button
        onClick={onNextWeek}
        css={css`
          background: none;
          border: none;
          color: ${GrayScale.White};
          cursor: pointer;
          padding: ${Spacing.Spacing100};
          border-radius: 4px;
          transition: background-color 0.2s ease;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}
      >
        <IC24NonArrowRightIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default WeekNavigator;
