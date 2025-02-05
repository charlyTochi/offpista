import React, {useEffect} from 'react';
import AuthenticatedStack from './AuthenticatedStack';
import SplashScreen from 'react-native-splash-screen';

const MainStack = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        SplashScreen.hide();
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    fetchData();
  }, []);

  return (<AuthenticatedStack />);
};

export default MainStack;
