/* eslint-disable react/react-in-jsx-scope */
import FavoriteIcon from '../assets/svg/FavoriteIcon';
import ForwardIcon from '../assets/svg/ForwardIcon';
import HomeIcon from '../assets/svg/HomeIcon';
import LoveIcon from '../assets/svg/LoveIcon';
import ProfileIcon from '../assets/svg/ProfileIcon';
import RewardIcon from '../assets/svg/RewardIcon';
import SearchIcon from '../assets/svg/SearchIcon';
import ShortsIcon from '../assets/svg/ShortsIcon';

export const ICONS = {
  homeIcon: color => <HomeIcon color={color} />,
  profileIcon: color => <ProfileIcon color={color} />,
  rewardIcon: color => <RewardIcon color={color} />,
  shortsIcon: color => <ShortsIcon color={color} />,
  searchIcon: <SearchIcon />,
  forwardIcon: <ForwardIcon />,
  loveIcon: <LoveIcon />,
  favoriteIcon: <FavoriteIcon />
};
