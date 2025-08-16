import { useContext } from 'react';
import WorkBlocksContext from './WorkBlocksContext';

const useWorkBlocks = () => {
  const context = useContext(WorkBlocksContext);
  if (!context) {
    throw new Error('useWorkBlocks must be used within a WorkBlocksProvider');
  }
  return context;
};

export default useWorkBlocks;
