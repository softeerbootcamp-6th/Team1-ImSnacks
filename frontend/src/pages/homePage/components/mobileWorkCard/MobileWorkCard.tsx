import S from './MobileWorkCard.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import { IC24CheckIcon } from '@/assets/icons/flat';
import { GrayScale } from '@/styles/colors';
import type { ButtonHTMLAttributes } from 'react';
import { UpdateMyWorkStatusRequestStatusEnum } from '@/types/openapiGenerator/models/all';
import { useTheme } from '@emotion/react';

export interface WorkCardRegisterProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  workId?: number;
  cropName: string;
  workName: string;
  workTime: string;
  status: UpdateMyWorkStatusRequestStatusEnum;
}

const MobileWorkCard = ({
  workId,
  cropName,
  workName,
  workTime,
  status,
  ...props
}: WorkCardRegisterProps) => {
  const isCompleted = status === UpdateMyWorkStatusRequestStatusEnum.Completed;
  const theme = useTheme();

  return (
    <div css={S.MobileWorkCard(status)}>
      <WorkCardRegisterContent
        id={workId}
        cropName={cropName}
        workName={workName}
        workTime={workTime}
        status={status}
        width={300}
      />
      <button onClick={props.onClick}>
        <IC24CheckIcon
          width={24}
          height={24}
          fill={isCompleted ? theme.ColorPrimary.B700 : 'none'}
          color={isCompleted ? GrayScale.White : GrayScale.G400}
        />
      </button>
    </div>
  );
};

export default MobileWorkCard;
