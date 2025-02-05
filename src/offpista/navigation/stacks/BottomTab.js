import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, StyleSheet, View} from 'react-native';
import {ICONS} from '../../utils/Icons';
import CustomText from '../../components/CustomText';
import {AllRoutes, BottomTabRoutes} from '../../utils/NavigationConstants';
import { COLORS } from '../../utils/Colors';
import { transitionConfig } from './NavigationConfig';
import { SizeUtils } from '../../utils/SizeUtils';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTab = () => {
  const getTabIcon = (tabName = '', focused = false) => {
    const color = focused ? COLORS.primary : COLORS.iconGray;
    switch (tabName) {
      case AllRoutes.HOME_DASHBOARD_SCREEN:
        return (
          <View style={styles.tab}>
            {ICONS.homeIcon(color)}
            <CustomText style={[styles.text, {color}]}>Home</CustomText>
          </View>
        );
      case AllRoutes.SHORTS_SCREEN:
        return (
          <View style={styles.tab}>
            {ICONS.shortsIcon(color)}
            <CustomText style={[styles.text, {color}]}>Shorts</CustomText>
          </View>
        );
      case AllRoutes.SHORTS_SCREEN:
        return (
          <View style={styles.tab}>
            {ICONS.rewardIcon(color)}
            <CustomText style={[styles.text, {color}]}>Reward</CustomText>
          </View>
        );
      case AllRoutes.SHORTS_SCREEN:
        return (
          <View style={styles.tab}>
            {ICONS.profileIcon(color)}
            <CustomText style={[styles.text, {color}]}>Profile</CustomText>
          </View>
        );
    }
  };

  return (
    <Navigator
      screenOptions={{
        ...transitionConfig,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          padding: 12,
          paddingHorizontal: 20,
          height: SizeUtils.responsiveHeight(
            Platform.select({ios: 10, android: 9}),
          ),
          width: '100%',
          borderTopLeftRadius: 20,
          borderTopEndRadius: 20,
        },
      }}
      initialRouteName={AllRoutes.HOME_DASHBOARD_SCREEN}>
      {BottomTabRoutes.map(tabs => {
        return (
          <Screen
            key={tabs.name}
            name={tabs.name}
            component={tabs.Screen}
            options={{
              headerShown: false,
              tabBarIcon: ({focused}) => getTabIcon(tabs.name, focused),
              tabBarLabel: () => null,
            }}
          />
        );
      })}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    gap: 5,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default BottomTab;
