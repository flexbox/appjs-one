import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import * as React from 'react';
import { ColorSchemeName, Platform } from 'react-native';

import Search from '../screens/Search';
import Settings from '../screens/Settings';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Search'
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{
          stackPresentation: Platform.select({
            ios: 'modal',
            android: 'push',
          }),
          headerShown: Platform.select({
            ios: false,
            android: true,
          }),
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
}
