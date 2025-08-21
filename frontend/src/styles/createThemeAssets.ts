import { ColorTheme, GrayScale } from '@/styles/colors';
import type { Theme } from '@emotion/react';

export const createThemeAssets = (themeKey: keyof typeof ColorTheme): Theme => {
  const theme = ColorTheme[themeKey] ?? ColorTheme.Default;

  return {
    ColorPrimary: {
      B700: theme.Pressed,
      B300: theme.Hover,
    },
    Assets: {
      Global: {
        Button: {
          Default: GrayScale.G200,
          Pressed: theme.Pressed,
          Hover: theme.Hover,
          Disabled: GrayScale.G200,
        },
      },
      Text: {
        Button: {
          SelectChip: {
            Default: GrayScale.G500,
            Pressed: GrayScale.White,
            Hover: GrayScale.White,
            Disabled: theme.Pressed,
          },
        },
      },
    },
  };
};
