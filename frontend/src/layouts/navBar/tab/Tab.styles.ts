import { css } from '@emotion/react';
import { Assets, GrayScale, Opacity } from '../../../styles/colors';
import { BorderRadius } from '../../../styles/borderRadius';

const TabStyle = css`
  display: flex;
  box-sizing: border-box;
  width: 124px;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: ${Assets.Text.Gnb.Default};
  border-radius: ${BorderRadius.Base.Round};
`;

const TabActive = css`
  color: ${Assets.Text.Gnb.Pressed};
  background-color: ${GrayScale.White};
  ${BorderRadius.Base.Round}
`;

const TabDefault = css`
  &:hover {
    background-color: ${GrayScale.White};
    opacity: ${Opacity.White.W300};
  }
`;

const LinkStyle = css`
  text-decoration: none;
  color: inherit;
`;

export default {
  TabStyle,
  TabActive,
  TabDefault,
  LinkStyle,
};
