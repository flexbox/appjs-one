import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View as RNView,
} from 'react-native';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text } from '../components/Themed';
import { type } from '../constants/Type';
import { BlueCheckIcon, SettingsCogIcon } from '../components/Icons';
import { RootStackParamList } from '../types';

export default function Settings({
  navigation,
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  const [currentDictionary, setCurrentDictionary] = useState<
    'NWL2018' | 'CSW15' | undefined
  >();

  useEffect(function didMount() {
    async function getDictionary() {
      const result = await AsyncStorage.getItem('@wordcheck:dictionary');

      if (result === 'NWL2018') {
        setCurrentDictionary('NWL2018');
      } else if (result === 'CSW15') {
        setCurrentDictionary('CSW15');
      } else {
        setCurrentDictionary('NWL2018');
      }
    }

    getDictionary();
  }, []);

  async function setDictionary(key: string) {
    try {
      await AsyncStorage.setItem('@wordcheck:dictionary', key);

      if (key === 'NWL2018') {
        setCurrentDictionary('NWL2018');
      } else if (key === 'CSW15') {
        setCurrentDictionary('CSW15');
      } else {
        setCurrentDictionary('NWL2018');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <View
        colorKey='backgroundSecondary'
        style={{
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <RNView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <RNView style={{ top: -1 }}>
            <SettingsCogIcon />
          </RNView>
          <Text style={[type.titleTwo, { marginLeft: 4 }]}>Settings</Text>
        </RNView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={type.title}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
        <Text style={type.title}>Dictionaries</Text>
        <TouchableOpacity
          onPress={() => setDictionary('NWL2018')}
          style={{ marginBottom: 16, marginTop: 16 }}
        >
          <View
            colorKey='backgroundSecondary'
            style={{
              padding: 16,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <RNView style={{ flex: 1 }}>
              <Text style={[type.title, { marginBottom: 4 }]}>
                NASPA Word List 2018 Edition
              </Text>
              <Text style={type.body}>
                Contains 192,111 words and is the latest official Scrabble word
                list for use in the United States, Canada, and Thailand.
              </Text>
            </RNView>
            <RNView
              style={{
                opacity: currentDictionary === 'NWL2018' ? 1 : 0,
                marginLeft: 16,
              }}
            >
              <BlueCheckIcon />
            </RNView>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDictionary('CSW15')}
          style={{ marginBottom: 16 }}
        >
          <View
            colorKey='backgroundSecondary'
            style={{
              padding: 16,
              borderRadius: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <RNView style={{ flex: 1 }}>
              <Text style={[type.title, { marginBottom: 4 }]}>
                Collins Scrabble Word List 2015 Edition
              </Text>
              <Text style={type.body}>
                Contains 276,663 words and is the latest approved Scrabble word
                list for use outside of the United States, Canada, and Thailand.
              </Text>
            </RNView>
            <RNView
              style={{
                opacity: currentDictionary === 'CSW15' ? 1 : 0,
                marginLeft: 16,
              }}
            >
              <BlueCheckIcon />
            </RNView>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{ padding: 16 }}>
        <Text style={type.title}>About Word Check</Text>
        <Text style={[type.body, { marginTop: 8, marginBottom: 16 }]}>
          Made by Jon Samp in Brooklyn, NY.
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.buymeacoffee.com/jonsamp');
          }}
        >
          <Image
            source={{
              uri: 'https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png',
            }}
            style={{ height: 50, width: 180 }}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
