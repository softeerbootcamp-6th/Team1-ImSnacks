import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    ColorPrimary: {
      B700: string;
      B400: string;
      B300: string;
    };
    Assets: {
      Global: {
        Button: {
          Default: string;
          Pressed: string;
          Hover: string;
          Disabled: string;
        };
      };
      Text: {
        Button: {
          SelectChip: {
            Default: string;
            Pressed: string;
            Hover: string;
            Disabled: string;
          };
        };
      };
    };
  }
}
