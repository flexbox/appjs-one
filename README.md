# Word check for SCRABBLE™️

Check if a word is playable in the game of SCRABBLE™️.

from https://github.com/jonsamp/word-check

## Get started

Install dependencies

```bash
yarn
```

Then run the app

```bash
yarn start
```

## Release

### Prepare the build

Double check if you are signed in with your expo.dev account from your terminal

```bash
eas whoami
eas login
```

We need to change our app credentials

```json
// app.json

{
  "expo": {
    "owner": "appjs-one",                    # expo organisation
    "ios": {
      "bundleIdentifier": "appjsone.words",  # application identifier
    },
    "android": {
      "package": "com.appjsone.wordcheck",   # application identifier
    }
  }
}
```

### How to make a build?

Configure `eas.json` options

```bash
eas build:configure
```

Ship the `ios` build to production

```bash
eas build --profile production --ios
```

## Custom plugins

To check the results, from VSCode `command` + `shift` + `P` and

```bash
Expo: Preview modifier
ios.infoPlist
```

![](./infoPlist-preview.gif)

## Prepare a device to run a build

```bash
eas device:create
```

```json
// app.json

  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
    },
  }
```

```bash
eas build --profile development --platform all
```

### Side by side Installation : `app.config.js`

```js
const IS_DEV = process.enc.APP_VARIANT === "developement"

export default {
  "name": IS_DEV ? "Word Check (Dev)" : "Word Check",
  "ios": {
    "bundleIdentifier": IS_DEV ? "appjsone.words.dev" : "appjsone.words",
  },
}

```

### Side by side Installation : `eas.json`

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "env": {
        "APP_VARIANT": "development"
      }
    },
    "production": {}
  }
}
```

## Setup flipper

https://github.com/jakobo/expo-community-flipper

```bash
yarn add expo-community-flipper react-native-flipper
```

```bash
eas build --profile devlopement --platform ios
```
