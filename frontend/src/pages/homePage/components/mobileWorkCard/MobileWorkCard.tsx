import S from './MobileWorkCard.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import { IC24CheckIcon } from '@/assets/icons/flat';
import { ColorPrimary, GrayScale } from '@/styles/colors';
import type { ButtonHTMLAttributes } from 'react';
import { UpdateMyWorkStatusRequestStatusEnum } from '@/types/openapiGenerator/models/all';

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

  return (
    <div css={S.MobileWorkCard(status)}>
      <WorkCardRegisterContent
        id={workId}
        cropName={cropName}
        workName={workName}
        workTime={workTime}
        status={status}
      />
      <button onClick={props.onClick}>
        <IC24CheckIcon
          width={24}
          height={24}
          fill={isCompleted ? ColorPrimary.B700 : 'none'}
          color={isCompleted ? GrayScale.White : GrayScale.G300}
        />
      </button>
    </div>
  );
};

export default MobileWorkCard;
