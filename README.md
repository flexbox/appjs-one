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
