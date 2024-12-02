
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/Store';
import GettingStartedScreen from './screens/auth/GettingStartedScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SIgnUpScreen';
import SplashScreen from './screens/auth/SplashScreen';
import BottomTabScreen from './screens/home/BottomTabScreen.tsx';
import { DarkThemeColors, LightThemeColors } from './themes/theme';
import UserPreferencesScreen from './screens/routeSuggestions/UserPreferences.tsx';
import CurrentLocationScreen from './screens/voiceNavigate/CurrentLocationScreen.js';

const Stack = createNativeStackNavigator();

// Main App Google Signin
GoogleSignin.configure({
  scopes: ['email'],
  webClientId:
    '6645240386-b8jbdd93n9r4cn5n7c0rr4ebdj0ltjk6.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function App() {
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const theme = isDarkMode ? DarkThemeColors : LightThemeColors;
  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <ReduxProvider store={store}>
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="GettingStart"
            component={GettingStartedScreen}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
          name="CurrentLocation"
          component={CurrentLocationScreen}
          options={{ title: 'Current Location' }}
        />
          <Stack.Screen name="BottomTab" component={BottomTabScreen} />
          <Stack.Screen name="UserPreferences" component={UserPreferencesScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </ReduxProvider>
  );
}
