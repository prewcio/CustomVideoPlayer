import React from 'react';

export interface Section {
  start: number;
  end: number;
  label: string;
  color: string;
  labelOn?: boolean;
}

export interface Theme {
  colors?: {
    toolbarBg?: string;
    progressBg?: string;
    sectionBg?: string;
  };
  icons?: {
    play?: JSX.Element;
    pause?: JSX.Element;
    skip?: JSX.Element;
    settings?: JSX.Element;
  };
}

export interface CustomVidPlayerProps {
  videoSrc: string;
  sections?: Section[];
  theme?: Theme;
}

declare const CustomVidPlayer: React.FC<CustomVidPlayerProps>;

export default CustomVidPlayer;
