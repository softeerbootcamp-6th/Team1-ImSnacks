import { type RefObject } from 'react';

const DragContainer = ({
  containerRef,
  children,
  ...props
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) => {
  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
};

export default DragContainer;
