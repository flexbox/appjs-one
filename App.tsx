import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Bold from './assets/fonts/sentinel-bold.otf';
import SemiBold from './assets/fonts/sentinel-semibold.otf';
import Italic from './assets/fonts/sentinel-bookItalic.otf';
import Regular from './assets/fonts/sentinel-book.otf';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Dictionary, loadDictionaryAsync } from './constants/database';

enableScreens();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        await loadDictionaryAsync(Dictionary.NWL2020);
        await loadDictionaryAsync(Dictionary.CSW21);

        await Font.loadAsync({
          Bold,
          SemiBold,
          Italic,
          Regular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 666,
        useNativeDriver: true,
      }).start();
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Animated.View
      style={{ opacity: fadeAnim, flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Animated.View>
  );
}
