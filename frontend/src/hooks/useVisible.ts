import { useState } from 'react';

const useVisible = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return {
    isVisible,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useVisible;
