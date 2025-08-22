import { type RefObject } from 'react';

interface DragContainerProps {
  containerRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

const DragContainer = ({
  containerRef,
  children,
  onDrop,
  onDragOver,
  ...props
}: DragContainerProps) => {
  return (
    <div ref={containerRef} onDrop={onDrop} onDragOver={onDragOver} {...props}>
      {children}
    </div>
  );
};

export default DragContainer;
