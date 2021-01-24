import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View as RNView,
} from 'react-native';
import * as Linking from 'expo-linking';

import { View, Text } from '../components/Themed';
import { type } from '../constants/Type';
import { BlueCheckIcon } from '../components/Icons';
import { RootStackParamList } from '../types';

export default function Settings({
  navigation,
}: StackScreenProps<RootStackParamList, 'Settings'>) {
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
        <Text style={type.titleTwo}>Settings</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={type.title}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={() => console.log('NWL2018')}
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
              <Text style={[type.title, { marginBottom: 4 }]}>NWL2018</Text>
              <Text style={type.body}>
                The NASPA Word List 2018 Edition has 192,111 words and is the
                latest official Scrabble word list for use in the United States,
                Canada, and Thailand.
              </Text>
            </RNView>
            <RNView>
              <BlueCheckIcon />
            </RNView>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('CSW15')}
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
              <Text style={[type.title, { marginBottom: 4 }]}>CSW15</Text>
              <Text style={type.body}>
                The Collins Scrabble Word List 2015 Edition has 276,663 words
                and is the latest approved Scrabble word list for use outside of
                the United States, Canada and Thailand.
              </Text>
            </RNView>
            <RNView>
              <BlueCheckIcon />
            </RNView>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 16 }}>
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
            style={{ height: 60, width: 217 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
