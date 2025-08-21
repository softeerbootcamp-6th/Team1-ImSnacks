import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface PortalComponentProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  offset?: number;
  children: React.ReactNode;
}

const PortalComponent = ({ anchorRef, children }: PortalComponentProps) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const element = anchorRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setPosition({ x: rect.left + rect.width / 2, y: rect.top });
  }, [anchorRef]);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: position?.x,
        top: position?.y,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default PortalComponent;
