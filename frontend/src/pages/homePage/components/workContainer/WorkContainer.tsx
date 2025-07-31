import { css } from '@emotion/react';
import WorkCell from '../workCell/WorkCell';

const WorkContainer = () => {
  const workCells = [
    <WorkCell type="Start" status="Default" />,
    ...Array.from({ length: 12 }, (_, index) => {
      return <WorkCell key={index} type="Middle" status="Default" />;
    }),
    <WorkCell type="End" status="Default" />,
  ];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
      `}
    >
      {workCells}
    </div>
  );
};

export default WorkContainer;
