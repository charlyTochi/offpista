import AuthenticatedStack from '../navigation/stacks/AuthenticatedStack';
import BottomTab from '../navigation/stacks/BottomTab';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ShortsScreen} from '../screens/shorts/ShortsScreen';

//all routes in the app
export const AllRoutes = {
  SHORTS_SCREEN: 'SHORTS_SCREEN',
  HOME_DASHBOARD_SCREEN: 'HOME_DASHBOARD_SCREEN',
  AUTHENTICATED_ROUTES: 'AUTHENTICATED_ROUTES',
};

//all authenticated routes -> Routes that may require authentication
export const AuthenticatedStackRoutes = [
  {name: AllRoutes.AUTHENTICATED_ROUTES, Screen: BottomTab},
  {name: AllRoutes.HOME_DASHBOARD_SCREEN, Screen: HomeScreen},
];
export const BottomTabRoutes = [
  {name: AllRoutes.HOME_DASHBOARD_SCREEN, Screen: HomeScreen},
  {name: AllRoutes.SHORTS_SCREEN, Screen: ShortsScreen},
];

export const AuthenticationStackRoutes = [
  {name: AllRoutes.AUTHENTICATED_ROUTES, Screen: AuthenticatedStack},
  ...AuthenticatedStackRoutes,
];

//Routes for AuthenticationStack
export const AuthenticationRoutes = [
  {name: AllRoutes.HOME_DASHBOARD_SCREEN, Screen: HomeScreen},
];

//These are global routes that could be navigated to from different stacks
export const GlobalRoutes = [
  ...AuthenticatedStackRoutes,
  ...AuthenticationStackRoutes,
];
