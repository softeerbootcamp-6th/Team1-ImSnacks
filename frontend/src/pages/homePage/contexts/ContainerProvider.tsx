import { useMemo, useRef, useState, type ReactNode } from 'react';
import ContainerContext from './ContainerContext';

const ContainerProvider = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const value = useMemo(
    () => ({ containerRef, scrollOffset, setScrollOffset }),
    [scrollOffset]
  );

  return (
    <ContainerContext.Provider value={value}>
      {children}
    </ContainerContext.Provider>
  );
};

export default ContainerProvider;
