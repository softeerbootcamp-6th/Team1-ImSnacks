import {
  IC24NonArrowLeftIcon,
  IC24NonArrowRightIcon,
} from '@/assets/icons/flat';
import S from './WeekNavigator.style';
import { GrayScale } from '@/styles/colors';

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
        <IC24NonArrowLeftIcon width={26} height={26} color={GrayScale.G50} />
      </button>
      <span>{weekLabel}</span>
      <button
        onClick={onNextWeek}
        disabled={isCurrentWeek}
        css={S.onNextWeekButton(isCurrentWeek)}
      >
        <IC24NonArrowRightIcon width={26} height={26} color={GrayScale.G50} />
      </button>
    </div>
  );
};

export default WeekNavigator;
