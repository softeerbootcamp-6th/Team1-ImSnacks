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

export const Opacity = {
  White: {
    W0: 0,
    W100: 0.1,
    W200: 0.2,
    W300: 0.3,
    W400: 0.4,
    W500: 0.5,
    W600: 0.6,
    W700: 0.7,
    W800: 0.8,
    W900: 0.9,
    W1000: 1,
  },
  G500: {
    '5o200': 0.2,
    '5o400': 0.4,
  },
  G800: {
    '8o200': 0.2,
    '8o400': 0.4,
  },
  G900: {
    '9o0': 0,
    '9o400': 0.4,
  },
  Green: {
    Gr200: 0.2,
    Gr400: 0.4,
  },
};

export const Gradient = {
  CardStroke: {
    W0: 0.1,
    W1000: 0.35,
    Angular: {
      stops: [
        { position: '10%', opacity: 'W0' },
        { position: '35%', opacity: 'W1000' },
        { position: '60%', opacity: 'W0' },
        { position: '85%', opacity: 'W1000' },
      ],
    },
    Dark: {
      Angular: {
        stops: [
          { position: '10%', color: '9o0' },
          { position: '35%', color: 'G900' },
          { position: '60%', color: '9o0' },
          { position: '85%', color: 'G900' },
        ],
      },
    },
  },
  Background: {
    Afternoon: {
      Clear: {
        Linear: {
          from: '#B9E8FF',
          to: '#1573ED',
          stops: [
            { position: '0%', color: '#B9E8FF' },
            { position: '100%', color: '#1573ED' },
          ],
        },
      },
      Cloudy: {
        Linear: {
          from: '#91B2C2',
          to: '#26374F',
          stops: [
            { position: '0%', color: '#91B2C2' },
            { position: '100%', color: '#26374F' },
          ],
        },
      },
      Hot: {
        Linear: {
          from: '#FFEECC',
          to: '#ED473B',
          stops: [
            { position: '0%', color: '#FFEECC' },
            { position: '100%', color: '#ED473B' },
          ],
        },
      },
    },
    Night: {
      Clear: {
        Linear: {
          from: '#5A659D',
          to: '#181324',
          stops: [
            { position: '0%', color: '#5A659D' },
            { position: '100%', color: '#181324' },
          ],
        },
      },
    },
    WeatherBoard: {
      Linear: {
        from: GrayScale.Black,
        to: GrayScale.G900,
        stops: [
          { position: '17%', color: GrayScale.Black },
          { position: '100%', color: GrayScale.G900 },
        ],
      },
    },
  },
  Conic: {
    Background: {
      from: '180deg',
      at: '50% 50%',
      stops: [
        { position: '36deg', color: 'rgba(253, 254, 254, 0.00)' },
        { position: '126deg', color: '#FDFEFE' },
        { position: '216deg', color: 'rgba(253, 254, 254, 0.00)' },
        { position: '306deg', color: '#FDFEFE' },
      ],
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

  opacity: Opacity,

  // Gradient
  gradient: Gradient,

  // Assets
  assets: Assets,
};
