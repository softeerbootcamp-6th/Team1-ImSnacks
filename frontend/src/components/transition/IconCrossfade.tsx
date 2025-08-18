import { css, type SerializedStyles } from '@emotion/react';
import { useFadeTransition } from '@/hooks/useFadeTransition';

interface IconCrossfadeProps<T> {
  value: T;
  iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;
  width?: number;
  height?: number;
  durationMs?: number;
  containerCss?: SerializedStyles;
  iconCss?: SerializedStyles;
}

function IconCrossfade<T>({
  value,
  iconMap,
  width,
  height,
  durationMs = 800,
  containerCss,
  iconCss,
}: IconCrossfadeProps<T>) {
  const {
    prev,
    isFading,
    durationMs: d,
  } = useFadeTransition(value, {
    durationMs,
  });

  const CurrentIcon = iconMap[String(value)];
  const PrevIcon = prev ? iconMap[String(prev)] : null;

  return (
    <div
      aria-hidden
      css={css`
        position: relative;
        ${containerCss}
      `}
    >
      {CurrentIcon && (
        <CurrentIcon width={width} height={height} css={iconCss} />
      )}
      {PrevIcon && (
        <PrevIcon
          width={width}
          height={height}
          css={css`
            ${iconCss}
            position: absolute;
            inset: 0;
            opacity: ${isFading ? 0 : 1};
            transition: opacity ${d}ms ease-in-out;
            pointer-events: none;
          `}
        />
      )}
    </div>
  );
}

export default IconCrossfade;
