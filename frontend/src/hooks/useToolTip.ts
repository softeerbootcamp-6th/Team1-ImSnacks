import { useState } from 'react';

const useToolTip = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return {
    showTooltip,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useToolTip;
