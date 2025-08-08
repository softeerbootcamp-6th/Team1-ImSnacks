import { useState } from 'react';

const useVisibility = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const toggle = () => {
    setIsVisible(prevState => !prevState);
  };

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

export default useVisibility;
