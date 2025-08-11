import { useContext } from 'react';
import { WorkBlocksContext } from './WorkBlocksContext';

const useWorkBlocks = () => {
  const context = useContext(WorkBlocksContext);
  if (context === undefined) {
    throw new Error(
      'useWorkBlocks는 반드시 WorkBlocksProvider 내에서 사용되어야 합니다'
    );
  }
  return context;
};

export default useWorkBlocks;
