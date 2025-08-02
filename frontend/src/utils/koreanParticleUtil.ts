// 한글 문자열의 마지막 글자의 받침 여부
export const hasFinalConsonant = (koreanString: string) => {
  const lastChar = koreanString[koreanString.length - 1];
  const code = lastChar.charCodeAt(0);

  if (code < 0xac00 || code > 0xd7a3) return false;

  const offset = code - 0xac00;
  const jongseongIndex = offset % 28;

  return jongseongIndex !== 0;
};

// 해당 문자열 마지막 글자의 받침 여부에 따라 "이" 또는 "가" 리턴
export const getSubjectParticle = (koreanString: string) => {
  if (hasFinalConsonant(koreanString)) {
    return '이';
  } else {
    return '가';
  }
};
