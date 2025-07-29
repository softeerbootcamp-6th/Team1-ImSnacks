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

  Subtitle: {
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
  Subtitle: {
    ...Typography.Subtitle,
    fontWeight: 700,
  },

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

// Typography with Medium weight
export const TypographyMedium = {
  Subtitle: {
    ...Typography.Subtitle,
    fontWeight: 500,
  },
};
