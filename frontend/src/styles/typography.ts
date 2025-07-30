// Typography System
export const Typography = {
  Headline: {
    fontSize: '36px',
    lineHeight: '54px',
    fontWeight: 700,
    letterSpacing: '-2%',
  },

  Mobile_Headline: {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 700,
    letterSpacing: '-1%',
  },
  Subtitle500: {
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 500,
    letterSpacing: '-2%',
  },
  Subtitle700: {
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 700,
    letterSpacing: '-2%',
  },

  Body_L: {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 400,
    letterSpacing: '-1%',
  },

  Body_M: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 400,
    letterSpacing: '-1%',
  },

  Body_S: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
    letterSpacing: '-0.5%',
  },

  Caption: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    letterSpacing: '-0.5%',
  },

  Caption_S: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '-0.5%',
  },
};

// Bold variants for typography that support multiple weights
export const TypographyBold = {
  Body_L: {
    ...Typography.Body_L,
    fontWeight: 700,
  },

  Body_M: {
    ...Typography.Body_M,
    fontWeight: 700,
  },

  Body_S: {
    ...Typography.Body_S,
    fontWeight: 700,
  },
};
