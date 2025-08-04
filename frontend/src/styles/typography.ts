const Subtitle = {
  fontSize: '24px',
  lineHeight: '36px',
  letterSpacing: '-2%',
};

const Body_S = {
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.5%',
};

const Body_M = {
  fontSize: '18px',
  lineHeight: '28px',
  letterSpacing: '-0.5%',
};

const Body_L = {
  fontSize: '20px',
  lineHeight: '32px',
  letterSpacing: '-0.5%',
};

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

  Subtitle_500: {
    ...Subtitle,
    fontWeight: 500,
  },

  Subtitle_700: {
    ...Subtitle,
    fontWeight: 700,
  },

  Body_L_400: {
    ...Body_L,
    fontWeight: 400,
  },

  Body_L_500: {
    ...Body_L,
    fontWeight: 500,
  },

  Body_L_700: {
    ...Body_L,
    fontWeight: 700,
  },

  Body_M_400: {
    ...Body_M,
    fontWeight: 400,
  },

  Body_M_700: {
    ...Body_M,
    fontWeight: 700,
  },

  Body_S_400: {
    ...Body_S,
    fontWeight: 400,
  },

  Body_S_700: {
    ...Body_S,
    fontWeight: 700,
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
