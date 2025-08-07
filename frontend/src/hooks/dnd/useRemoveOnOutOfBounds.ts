const useRemoveOnOutOfBounds = <T>({
  containerRef,
  items,
  getItemId,
  getItemPosition,
  getItemWidth,
  onRemove,
}: {
  containerRef: React.RefObject<HTMLElement>;
  items: T[];
  getItemId: (item: T) => number | string;
  getItemPosition: (item: T) => { x: number; y: number };
  getItemWidth: (item: T) => number;
  onRemove: (id: number | string) => void;
}) => {
  // 드래그 종료 시 호출
  const checkAndRemove = (id: number | string) => {
    const item = items.find(i => getItemId(i) === id);
    if (!item || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { x, y } = getItemPosition(item);
    const width = getItemWidth(item);

    if (x < 0 || y < 0 || x + width > rect.width || y > rect.height) {
      onRemove(id);
    }
  };

  return { checkAndRemove };
};

export default useRemoveOnOutOfBounds;
