import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {COLORS} from '../../utils/Colors';

const RewardIcon = ({color = COLORS.primary}) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none">
      <Path
        d="M20.75 12.5V22.5H4.75V12.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M22.75 7.5H2.75V12.5H22.75V7.5Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.75 22.5V7.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.75 7.5H8.25C7.58696 7.5 6.95107 7.23661 6.48223 6.76777C6.01339 6.29893 5.75 5.66304 5.75 5C5.75 4.33696 6.01339 3.70107 6.48223 3.23223C6.95107 2.76339 7.58696 2.5 8.25 2.5C11.75 2.5 12.75 7.5 12.75 7.5Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.75 7.5H17.25C17.913 7.5 18.5489 7.23661 19.0178 6.76777C19.4866 6.29893 19.75 5.66304 19.75 5C19.75 4.33696 19.4866 3.70107 19.0178 3.23223C18.5489 2.76339 17.913 2.5 17.25 2.5C13.75 2.5 12.75 7.5 12.75 7.5Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default RewardIcon;
