import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View as RNView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useColorScheme from '../hooks/useColorScheme';
import { View, Text } from '../components/Themed';
import { useThemeColor } from '../components/Themed';
import { type } from '../constants/Type';
import { RootStackParamList } from '../types';
import AppIconImage from '../assets/images/icon-1.png';
import DarkAppIconImage from '../assets/images/icon-dark.png';
import {
  SettingsIcon,
  CancelIcon,
  CheckIcon,
  XIcon,
} from '../components/Icons';

export default function Search(
  props: StackScreenProps<RootStackParamList, 'Search'>
) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const textColor = useThemeColor('text');
  const textSecondaryColor = useThemeColor('textSecondary');
  const [searchValue, onChangeText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<
    { isValid: boolean; definition?: string; id?: number } | undefined
  >(undefined);

  function capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  async function handleSubmit() {
    setResult(undefined);
    setLoading(true);

    try {
      const response = await fetch(
        `https://s3-us-west-2.amazonaws.com/words.alexmeub.com/otcwl2018/${searchValue.toLowerCase()}.json`
      );
      const json = await response.json();

      setResult({
        isValid: true,
        definition: json.definition,
        id: json.index,
      });
    } catch (error) {
      setResult({
        isValid: false,
        definition: undefined,
        id: undefined,
      });
    }

    setLoading(false);
  }

  return (
    <View
      style={{
        padding: 16,
        paddingLeft: insets.left + 16,
        paddingTop: insets.top + 8,
        paddingRight: insets.right + 16,
        flex: 1,
      }}
    >
      <View
        style={[
          styles.displayHorizontal,
          {
            marginBottom: 16,
            justifyContent: 'space-between',
          },
        ]}
      >
        <View style={styles.displayHorizontal}>
          <RNView
            style={{
              shadowColor: 'black',
              shadowRadius: 2,
              shadowOffset: { height: 1, width: 0 },
              shadowOpacity: 0.25,
            }}
          >
            <RNView
              style={{
                borderRadius: 7,
                overflow: 'hidden',
                marginRight: 12,
                justifyContent: 'center',
                height: 40,
                width: 40,
              }}
            >
              <Image
                source={isDark ? DarkAppIconImage : AppIconImage}
                style={{ width: 40, height: 40 }}
              />
            </RNView>
          </RNView>
          <RNView>
            <Text
              style={[
                styles.header,
                {
                  top: 8,
                },
              ]}
            >
              Word Check
            </Text>
          </RNView>
        </View>
        <TouchableOpacity onPress={() => props.navigation.push('Settings')}>
          <SettingsIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.displayHorizontal}>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: textColor,
              borderColor: textSecondaryColor,
            },
          ]}
          placeholderTextColor={textSecondaryColor}
          autoCorrect={false}
          onSubmitEditing={() => handleSubmit()}
          onChangeText={(text) => {
            setResult(undefined);
            onChangeText(text);
          }}
          value={searchValue}
          placeholder='Search'
          returnKeyType='search'
        />
        {Boolean(searchValue) && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              padding: 8,
              marginRight: -8,
            }}
            onPress={() => {
              setResult(undefined);
              onChangeText('');
            }}
          >
            <CancelIcon />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <ActivityIndicator />}
        {!loading && result && (
          <View
            style={[styles.displayHorizontal, styles.validationContainer]}
            colorKey='backgroundSecondary'
          >
            {result.isValid ? <CheckIcon /> : <XIcon />}
            <Text style={styles.validationText}>
              {capitalizeFirstLetter(searchValue)} is{' '}
              {result.isValid ? 'a playable word.' : 'not a playable word.'}
            </Text>
          </View>
        )}
        {!loading && !result && !searchValue && (
          <Text
            style={[
              type.body,
              {
                textAlign: 'center',
                marginHorizontal: 60,
                marginTop: 60,
                color: textSecondaryColor,
              },
            ]}
          >
            Tap "Search" to check if a word is playable.
          </Text>
        )}
        {!loading && result && result.isValid && result.definition && (
          <View>
            <View
              key={result.id}
              style={styles.definitionContainer}
              colorKey='backgroundSecondary'
            >
              <RNView>
                <Text style={type.titleTwo}>
                  {capitalizeFirstLetter(searchValue)}
                </Text>
              </RNView>
              <RNView style={styles.def}>
                <Text style={type.body}>
                  {capitalizeFirstLetter(
                    result.definition.split('[')[0].split(', also')[0]
                  ).trim()}
                  .
                </Text>
              </RNView>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    ...type.largeTitle,
    fontFamily: 'SemiBold',
    marginBottom: 16,
    fontSize: 24,
  },
  displayHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    ...type.body,
    height: 40,
    fontSize: 28,
    lineHeight: 28,
    borderBottomWidth: 1,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 2,
    marginLeft: 8,
    height: 40,
  },
  searchButtonText: {
    ...type.headline,
    color: '#FFF',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 32,
  },
  validationContainer: {
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  definitionContainer: {
    padding: 16,
    borderRadius: 4,
  },
  wordSeparator: {
    marginHorizontal: 8,
  },
  validationText: {
    ...type.body,
    marginLeft: 12,
    top: 1,
  },
  def: {
    marginBottom: 4,
  },
});
