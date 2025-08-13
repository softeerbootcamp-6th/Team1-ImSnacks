import { useContext } from 'react';
import { WorkBlocksContext } from './WorkBlocksContext';

const useWorkBlocks = () => {
  const context = useContext(WorkBlocksContext);

  return context;
};

export default useWorkBlocks;
