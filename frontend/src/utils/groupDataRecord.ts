/**
 * 배열 형태의 데이터를 특정 키(key)를 기준으로 그룹화하여
 * Record<string, T[V]> 형태로 변환하는 유틸 함수
 *
 * @param data - 원본 데이터 배열
 * @param groupKey - 그룹화 기준이 되는 키 (예: 날짜 문자열 등)
 * @param itemsKey - 각 항목에서 추출하여 저장할 데이터 키
 * @returns key 값을 기준으로 그룹화된 객체
 */
export const groupDataRecordStructure = <
  T,
  K extends keyof T,
  V extends keyof T
>(
  data: T[],
  groupKey: K,
  itemsKey: V
): Record<string, T[V]> => {
  return data.reduce<Record<string, T[V]>>((acc, item) => {
    const key = item[groupKey];
    const values = item[itemsKey];

    acc[typeof key === 'string' ? key : String(key)] = values;

    return acc;
  }, {});
};
