import { css } from '@emotion/react';
import { gradientStyles } from '@/styles/gradientStyles';
import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';
import ToolTip from '@/components/toolTip/ToolTip';
import { Opacity } from '@/styles/colors';

const HomePage = () => {
  return (
    <div
      css={css`
        ${gradientStyles.backgroundAfternoonClear}
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <WorkContainer />
      <div
        css={css`
          position: absolute;
          top: 100px;
          left: 100px;
          width: 100px;
          height: 100px;
          background-color: ${Opacity.White.W100};
        `}
      >
        <ToolTip direction="top" content={<div>test</div>} />
        <ToolTip direction="bottom" content={<div>test</div>} />
        <ToolTip direction="left" content={<div>test</div>} />
        <ToolTip direction="right" content={<div>test</div>} />
      </div>
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
