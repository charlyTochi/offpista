import React from 'react';
import {Path, Svg} from 'react-native-svg';

const SearchIcon = () => {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <Path
        d="M22.5 30C26.6421 30 30 26.6421 30 22.5C30 18.3579 26.6421 15 22.5 15C18.3579 15 15 18.3579 15 22.5C15 26.6421 18.3579 30 22.5 30Z"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M33 33L28 28"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;
