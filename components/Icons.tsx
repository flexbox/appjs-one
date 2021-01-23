import React from 'react';
import { Path, Svg, Rect } from 'react-native-svg';
import { useThemeColor } from '../components/Themed';

export function XIcon() {
  const fill = useThemeColor('danger');

  return (
    <Svg width={25} height={25} fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M24.944 12.986c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12s5.372-12 12-12c6.627 0 12 5.373 12 12zm-13.414 0L7.655 9.112 9.07 7.698l3.874 3.874 3.874-3.874 1.414 1.414-3.874 3.874 3.874 3.874-1.414 1.414-3.874-3.874-3.874 3.874-1.415-1.414 3.875-3.874z'
        fill={fill}
      />
    </Svg>
  );
}

export function CheckIcon() {
  const fill = useThemeColor('success');
  return (
    <Svg width={25} height={25} fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12.944 24.986c6.627 0 12-5.373 12-12s-5.373-12-12-12c-6.628 0-12 5.373-12 12s5.372 12 12 12zm-.492-7.084l7.05-9.37-1.598-1.202-6.274 8.338-2.789-3.496-1.563 1.247 3.593 4.505.805 1.009.776-1.031z'
        fill={fill}
      />
    </Svg>
  );
}

export function CancelIcon() {
  const backgroundButtonColor = useThemeColor('backgroundButton');
  const foregroundColor = useThemeColor('text');
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
      <Rect width='24' height='24' rx='4' fill={backgroundButtonColor} />
      <Path
        d='M8 16l8-8M16 16L8 8'
        stroke={foregroundColor}
        strokeWidth='2'
        strokeLinecap='round'
      />
    </Svg>
  );
}

export function AboutIcon() {
  const backgroundButtonColor = useThemeColor('backgroundButton');
  const foregroundColor = useThemeColor('text');
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
      <Rect width='24' height='24' rx='4' fill={backgroundButtonColor} />
      <Path
        d='M10.962 13.772h1.395c.358-1.079 1.158-1.575 2.06-2.123C15.2 11.17 16 10.52 16 9.081 16 7.352 14.468 6 11.966 6 9.43 6 8 7.352 8 8.91c0 1.044.647 1.678 1.566 1.678.953 0 1.464-.634 1.464-1.387 0-.667-.409-1.147-1.056-1.335.205-.308.698-.497 1.26-.497.987 0 1.464.548 1.464 1.575 0 .856-.34 1.336-.817 2.055-.51.77-.936 1.506-.92 2.773zM11.66 18c.987 0 1.719-.736 1.719-1.66 0-.908-.732-1.627-1.685-1.627-.988 0-1.72.736-1.72 1.66 0 .908.732 1.627 1.686 1.627z'
        fill={foregroundColor}
      />
    </Svg>
  );
}
