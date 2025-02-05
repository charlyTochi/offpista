import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  AllRoutes,
  AuthenticatedStackRoutes,
} from '../../utils/NavigationConstants';
import { transitionConfig } from './NavigationConfig';
import { getUniqueArray } from '../../utils/Arrays';

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{...transitionConfig}}
      initialRouteName={AllRoutes.AUTHENTICATED_ROUTES}>
      {getUniqueArray(AuthenticatedStackRoutes, 'name').map((route, idx) => {
        const {name, Screen} = route;
        return (
          <Stack.Screen
            name={name}
            component={Screen}
            options={{headerShown: false}}
            key={idx}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
