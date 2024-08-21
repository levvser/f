declare module 'react-medium-image-zoom' {
  import React from 'react';

  export interface ZoomProps {
    zoomMargin?: number;
    overlayBgColorStart?: string;
    overlayBgColorEnd?: string;
    transitionDuration?: number;
    zoomZindex?: number;
    closeText?: string;
    openText?: string;
    zoomImg?: {
      src: string;
      alt: string;
      style?: React.CSSProperties;
      className?: string;
    };
  }

  const Zoom: React.FC<ZoomProps>;

  export default Zoom;
}
