import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import ToolTip from '../toolTip/ToolTip';
import type { ToolTipProps } from '../toolTip/ToolTip';

interface PortalToolTipProps extends ToolTipProps {
  anchorRef: React.RefObject<HTMLElement | null>;
}

const PortalToolTip = ({ anchorRef, ...props }: PortalToolTipProps) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  useEffect(() => {
    const element = anchorRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, [anchorRef]);

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: position?.x,
        top: position?.y,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <ToolTip {...props} />
    </div>,
    document.body
  );
};

export default PortalToolTip;
