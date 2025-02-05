import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {COLORS} from '../../utils/Colors';

const HomeIcon = ({color = COLORS.primary}) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.52212 8.89949C4.03495 9.27841 3.75 9.86102 3.75 10.4782V20.5C3.75 21.0305 3.96071 21.5392 4.33579 21.9142C4.71086 22.2893 5.21957 22.5 5.75 22.5H9.75V15.5C9.75 14.9477 10.1977 14.5 10.75 14.5H14.75C15.3023 14.5 15.75 14.9477 15.75 15.5V22.5H19.75C20.2804 22.5 20.7891 22.2893 21.1642 21.9142C21.5393 21.5392 21.75 21.0305 21.75 20.5V10.4782C21.75 9.86102 21.4651 9.27841 20.9779 8.89949L13.9779 3.45505C13.2557 2.89332 12.2443 2.89332 11.5221 3.45505L4.52212 8.89949Z"
        fill={color}
      />
    </Svg>
  );
};

export default HomeIcon;
