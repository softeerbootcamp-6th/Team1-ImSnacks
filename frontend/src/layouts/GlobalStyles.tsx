import { Global, css } from '@emotion/react';

const resetCss = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;

    font-size: 100%;
    vertical-align: baseline;

    border: 0;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  button {
    cursor: pointer;
    background-color: unset;
    border: none;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }

  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    line-height: 1.5;
  }
`;

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'SUITE Variable';
          src: url('/assets/fonts/SUITE-Variable.ttf') format('truetype');
        }

        ${resetCss}

        body {
          overscroll-behavior: none;

          min-height: 100vh;
        }

        * {
          font-family: 'SUITE Variable', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          user-select: none;
        }
      `}
    />
  );
};

export default GlobalStyles;
