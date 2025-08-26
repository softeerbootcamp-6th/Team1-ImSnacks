interface GetLeftProps {
  parentWidth: number;
  componentWidth: number;
  index: number;
  count: number;
}

export const getLeft = ({
  parentWidth,
  componentWidth,
  index,
  count,
}: GetLeftProps) => {
  if (count === 1) return 0;
  const gap = (parentWidth - componentWidth) / (count - 1);
  return gap * index;
};
