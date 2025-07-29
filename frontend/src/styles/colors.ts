// Primary Colors - Blue Palette
export const ColorPrimary = {
  B100: '#E2EEFD',
  B200: '#C8DFFB',
  B300: '#7FB7FA',
  B400: '#4495F8',
  B500: '#147AF6',
  B600: '#096BE2',
  B700: '#075481',
  B800: '#053876',
  B900: '#03254E',
};

// Status Global Colors
export const ColorStatus = {
  Global: {
    Red: '#F65B5B',
    Orange: '#ED764A',
    Yellow: '#F8D058',
    Green: '#26A49C',
  },
  Growth: {
    Grb100: '#ECF4FE',
    Grb200: '#F8FCF8',
    Grb300: '#FEF6FC',
    Grb400: '#FFF5F6',
    Grb500: '#FEF7F5',
    Grb600: '#F7F5FE',
    Grb700: '#F5FCFE',
    Grb800: '#FBF0EF',
    Grt100: ColorPrimary.B700,
    Grt200: '#418443',
    Grt300: '#CF18AD',
    Grt400: '#E40022',
    Grt500: '#D93107',
    Grt600: '#6751F8',
    Grt700: '#097FA3',
    Grt800: '#861A0E',
  },
  Crops: {
    Apple: '#F65B75',
    Pear: '#72CB19',
    Peach: '#E692EB',
    Grape: '#AD65F5',
    Persimmon: '#F06F33',
    Mandarin: '#FAD416',
  },
};

export const GrayScale = {
  White: '#FDFEFE',
  G50: '#F9FAFB',
  G100: '#F2F4F7',
  G200: '#E6E8EF',
  G300: '#CED3DE',
  G400: '#B4BCCF',
  G500: '#A4ADC3',
  G600: '#8D95AD',
  G700: '#71778F',
  G800: '#596072',
  G900: '#383048',
  Black: '#171718',
};

// Assets Design System - 색상만 정의
export const Assets = {
  // Global/Button
  Global: {
    Button: {
      Default: GrayScale.G400,
      Pressed: GrayScale.White,
      Hover: GrayScale.White,
      Disabled: GrayScale.G200,
    },
  },

  // Text/Global
  Text: {
    Global: {
      Clear: GrayScale.White,
      Clear_Caption: GrayScale.G50,
      Headline: GrayScale.G900,
      Body: GrayScale.G800,
      Caption: GrayScale.G700,
    },

    // Text/Button
    Button: {
      SelectChip: {
        Default: GrayScale.G500,
        Pressed: GrayScale.White,
        Hover: GrayScale.White,
        Disabled: ColorPrimary.B700,
      },
      CreateWork: {
        Default: GrayScale.G700,
        Hover: GrayScale.White,
        Disabled: 'transparent', // W0 - 투명
      },
    },

    // Text/Gnb (Global Navigation Bar)
    Gnb: {
      Default: GrayScale.G700,
      Pressed: GrayScale.G800,
      Hover: GrayScale.G700,
    },

    // Text/WorkCard
    WorkCard: {
      Default: {
        Headline: GrayScale.G900,
        Body: GrayScale.G800,
      },
      Drag: {
        Headline: GrayScale.White,
        Body: GrayScale.G50,
      },
    },

    // Text/CropInfoCard
    CropInfoCard: {
      Headline: GrayScale.White,
      Body: GrayScale.G50,
    },

    // Text/ToolTip
    ToolTip: {
      Default: ColorPrimary.B700,
      Working: {
        Header: GrayScale.G900,
        Caption: GrayScale.G800,
      },
      Neighbor: GrayScale.White,
    },
  },
};

// 통합된 컬러 시스템
export const colorSystem = {
  // Primary Colors
  primary: ColorPrimary,

  // Status Colors
  global: ColorStatus.Global,

  // Growth Colors
  growth: ColorStatus.Growth,

  // Crops Colors
  crops: ColorStatus.Crops,

  // Gray Scale
  grayscale: GrayScale,

  // Assets
  assets: Assets,
};
