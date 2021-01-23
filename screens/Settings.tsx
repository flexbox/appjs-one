import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../types';

export default function Settings({
  navigation,
}: StackScreenProps<RootStackParamList, 'Settings'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 20,
            bottom: insets.bottom,
          }}
        >
          <View style={styles.displayHorizontal}>
            <View style={{ flex: 1 }}>
              <Text style={type.title}>About Word Check</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{ top: -4, right: -4 }}
            >
              <CancelIcon />
            </TouchableOpacity>
          </View>
          <Text style={[type.body, { marginTop: 12 }]}>
            Word Check is an app made after playing Scrabble with family over a
            holiday. Inevitably, someone would play some word that no one knew,
            so, lacking a physical dictionary, we searched the net. The problem
            was that all the word checking sites had tons of ads and they also
            gave hints to similar words. In my book, that's nearly cheating. So,
            I made this app to give a simple "yes" or "no" answer as to whether
            a word is playable.
          </Text>
          <Text style={[type.body, { marginTop: 12 }]}>
            Created with ☕️ by Jon Samp in Brooklyn, New York. Find me on
            Twitter:{' '}
            <Text
              style={{ fontFamily: 'SemiBold', color: 'blue' }}
              onPress={() => {
                Linking.openURL('https://www.twitter.com/jonsamp');
              }}
            >
              @JonSamp
            </Text>
            .
          </Text>
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
