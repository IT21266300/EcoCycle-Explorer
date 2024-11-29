import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from 'iconsax-react-native';
import React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import HomeTab from './tabs/HomeTab';
import ProfileScreen from './tabs/ProfileScreen';
import VoiceNavigate from './tabs/VoiceNavigate';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  const {colors} = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.BottomTabBar.activeTintColor,
        tabBarInactiveTintColor: colors.BottomTabBar.inactiveTintColor,
        tabBarActiveBackgroundColor: colors.BottomTabBar.activeBackgroundColor,
        tabBarInactiveBackgroundColor:
          colors.BottomTabBar.inactiveBackgroundColor,
        tabBarStyle: {
          backgroundColor: colors.BottomTabBar.inactiveBackgroundColor,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="VoiceNavigate"
        component={VoiceNavigate}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
