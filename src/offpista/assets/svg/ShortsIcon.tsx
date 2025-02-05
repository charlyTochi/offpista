import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import {COLORS} from '../../utils/Colors';

const ShortsIcon = ({color = COLORS.primary}) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none">
      <G clip-path="url(#clip0_13_926)">
        <Rect
          x="5.375"
          y="2.5"
          width="14"
          height="20"
          rx="2"
          stroke={color}
          stroke-width="2"
        />
        <Path
          d="M2.875 4.5V4.5C2.04657 4.5 1.375 5.17157 1.375 6V19C1.375 19.8284 2.04657 20.5 2.875 20.5V20.5"
          stroke={color}
          stroke-width="2"
        />
        <Path
          d="M21.875 4.5V4.5C22.7034 4.5 23.375 5.17157 23.375 6V19C23.375 19.8284 22.7034 20.5 21.875 20.5V20.5"
          stroke={color}
          stroke-width="2"
        />
        <Path
          d="M9.875 10.241C9.875 9.46925 10.7122 8.98838 11.3789 9.37726L14.3942 11.1362C15.0557 11.5221 15.0557 12.4779 14.3942 12.8638L11.3789 14.6227C10.7122 15.0116 9.875 14.5308 9.875 13.759V10.241Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13_926">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.375 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ShortsIcon;
