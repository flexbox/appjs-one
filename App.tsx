import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Bold from './assets/fonts/sentinel-bold.otf';
import SemiBold from './assets/fonts/sentinel-semibold.otf';
import Italic from './assets/fonts/sentinel-bookItalic.otf';
import Regular from './assets/fonts/sentinel-book.otf';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

enableScreens();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(
    function onLoadedUpdate() {
      if (isLoadingComplete) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 666,
          useNativeDriver: true,
        }).start();
      }
    },
    [isLoadingComplete]
  );

  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();

      await Font.loadAsync({
        Bold,
        SemiBold,
        Italic,
        Regular,
      });
    } catch (e) {
      console.warn(e);
    } finally {
      return;
    }
  }

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAndDataAsync}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Animated.View>
    );
  }
}
