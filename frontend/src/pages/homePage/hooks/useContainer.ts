import { useRef, useState } from 'react';

const useContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  return { containerRef, scrollOffset, setScrollOffset };
};

export default useContainer;
