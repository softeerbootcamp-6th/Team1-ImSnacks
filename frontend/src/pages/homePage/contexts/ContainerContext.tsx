import { createContext, type RefObject } from 'react';

export interface ContainerContextType {
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
}

const ContainerContext = createContext<ContainerContextType>({
  containerRef: { current: null },
  scrollOffset: 0,
  setScrollOffset: () => {},
});

export default ContainerContext;
