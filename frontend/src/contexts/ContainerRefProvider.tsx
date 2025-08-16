import { useRef, type ReactNode } from 'react';
import ContainerRefContext from './ContainerRefContext';

interface ContainerRefProviderProps {
  children: ReactNode;
}

export const ContainerRefProvider = ({
  children,
}: ContainerRefProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ContainerRefContext value={{ containerRef }}>
      {children}
    </ContainerRefContext>
  );
};
