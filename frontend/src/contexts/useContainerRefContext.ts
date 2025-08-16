import { useContext } from 'react';
import ContainerRefContext from './ContainerRefContext';

export const useContainerRef = () => {
  const context = useContext(ContainerRefContext);
  if (!context) {
    throw new Error(
      'useContainerRef must be used within a ContainerRefProvider'
    );
  }
  return context;
};
