import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {COLORS} from '../../utils/Colors';

const ProfileIcon = ({color = COLORS.primary}) => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none">
      <Path
        d="M20.25 21.5V19.5C20.25 18.4391 19.8286 17.4217 19.0784 16.6716C18.3283 15.9214 17.3109 15.5 16.25 15.5H8.25C7.18913 15.5 6.17172 15.9214 5.42157 16.6716C4.67143 17.4217 4.25 18.4391 4.25 19.5V21.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.25 11.5C14.4591 11.5 16.25 9.70914 16.25 7.5C16.25 5.29086 14.4591 3.5 12.25 3.5C10.0409 3.5 8.25 5.29086 8.25 7.5C8.25 9.70914 10.0409 11.5 12.25 11.5Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
