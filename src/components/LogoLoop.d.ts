import type { ComponentType, CSSProperties, ReactNode } from 'react';

type LogoLoopDirection = 'left' | 'right' | 'up' | 'down';

interface LogoImageItem {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

interface LogoNodeItem {
  node: ReactNode;
  href?: string;
  title?: string;
  ariaLabel?: string;
}

export type LogoLoopItem = LogoImageItem | LogoNodeItem;

export interface LogoLoopProps {
  logos: LogoLoopItem[];
  speed?: number;
  direction?: LogoLoopDirection;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopItem, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

declare const LogoLoop: ComponentType<LogoLoopProps>;
export default LogoLoop;
export { LogoLoop };
