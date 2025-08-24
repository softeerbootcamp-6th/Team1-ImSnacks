import { ColorPrimary, ColorStatus, GrayScale } from '@/styles/colors';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';

const LoginContainer = css`
  ${FlexStyles.flexColumn}
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const LogoWrapper = css`
  ${FlexStyles.flexRow}
  margin-bottom: 32px;
`;

const LoginCard = (isMobile: boolean) => css`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: ${isMobile ? '100%' : '400px'};
  box-sizing: border-box;
  overflow: hidden;
`;

const LoginHeader = css`
  text-align: center;
  margin-bottom: 32px;
`;

const LoginTitle = css`
  font-size: 28px;
  font-weight: 700;
  color: ${GrayScale.G900};
  margin: 0 0 8px 0;
`;

const LoginForm = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const LoginInputGroup = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

const LoginLabel = css`
  font-size: 14px;
  font-weight: 600;
  color: ${GrayScale.G800};
`;

const LoginInput = css`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border: 2px solid ${GrayScale.G200};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${ColorPrimary.B500};
  }

  &::placeholder {
    color: ${GrayScale.G400};
  }
`;

const LoginErrorMessage = css`
  color: ${ColorStatus.Global.Red};
  font-size: 14px;
  text-align: center;
  padding: 8px;
  border-radius: 6px;
`;

const LoginSubmitButton = css`
  background: ${ColorPrimary.B400};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export default {
  LoginContainer,
  LogoWrapper,
  LoginCard,
  LoginHeader,
  LoginTitle,
  LoginForm,
  LoginInputGroup,
  LoginLabel,
  LoginInput,
  LoginErrorMessage,
  LoginSubmitButton,
};
