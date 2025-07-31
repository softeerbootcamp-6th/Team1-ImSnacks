import { useState } from 'react';
import { ColorPrimary, Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';

interface WorkCellProps {
  type: 'Start' | 'Middle' | 'End';
  status: 'Default' | 'Hover' | 'Active';
}

const borderRadiusStyles = {
  Start: css`
    border-radius: ${BorderRadius.Base.Soft} 0 0 ${BorderRadius.Base.Soft};
  `,
  Middle: css`
    border-radius: 0;
  `,
  End: css`
    border-radius: 0 ${BorderRadius.Base.Soft} ${BorderRadius.Base.Soft} 0;
  `,
};

const statusStyles = {
  Default: css`
    background-color: ${Opacity.White.W200};
  `,
  Hover: css`
    background-color: ${Opacity.White.W800};
  `,
  Active: css`
    background-color: ${Opacity.White.W800};
  `,
};

const WorkCell = ({ type, status }: WorkCellProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      css={css`
        width: 92px;
        height: 176px;
        ${borderRadiusStyles[type]};
        ${isHovered ? statusStyles.Hover : statusStyles[status]}
        transition: background-color 0.1s ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:active {
          ${statusStyles.Active}
        }
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          css={css`
            ${Typography.Caption_S}
            color: ${ColorPrimary.B300};
            text-align: center;
            white-space: pre-line;
          `}
        >
          작업 일정을{'\n'}드래그 하세요
        </div>
      )}
    </div>
  );
};

export default WorkCell;
