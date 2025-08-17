import { useContext } from 'react';
import ContainerContext from './ContainerContext';

const useContainer = () => {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error('useContainer must be used within a ContainerContext');
  }
  return context;
};

export default useContainer;
