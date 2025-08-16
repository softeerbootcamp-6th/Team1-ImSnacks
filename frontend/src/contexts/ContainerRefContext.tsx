import { createContext, type RefObject } from 'react';

interface ContainerRefContextType {
  containerRef: RefObject<HTMLDivElement | null>;
}

const ContainerRefContext = createContext<ContainerRefContextType | null>(null);

export default ContainerRefContext;
