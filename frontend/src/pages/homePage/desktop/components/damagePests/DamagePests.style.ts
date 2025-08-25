import { css } from '@emotion/react';

const DamagePests = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 72px;
`;

const DamagePestsContentWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const DamageCardRowWrapper = css`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 866px;
  height: 218px;
`;

export default {
  DamagePests,
  DamagePestsContentWrapper,
  DamageCardRowWrapper,
};
