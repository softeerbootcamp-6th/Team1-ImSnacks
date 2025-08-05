import {
  IC24NonArrowLeftIcon,
  IC24NonArrowRightIcon,
} from '@/assets/icons/flat';
import S from './WeekNavigator.style';

interface WeekNavigatorProps {
  weekLabel: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  isCurrentWeek: boolean;
}

const WeekNavigator = ({
  weekLabel,
  onPreviousWeek,
  onNextWeek,
  isCurrentWeek,
}: WeekNavigatorProps) => {
  return (
    <div css={S.WeeklyNavigator}>
      <button onClick={onPreviousWeek} css={S.onPreviousWeekButton}>
        <IC24NonArrowLeftIcon width={24} height={24} />
      </button>
      <span>{weekLabel}</span>
      <button
        onClick={onNextWeek}
        disabled={isCurrentWeek}
        css={S.onNextWeekButton(isCurrentWeek)}
      >
        <IC24NonArrowRightIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default WeekNavigator;
