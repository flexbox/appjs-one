import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

import CSW21 from './databases/CSW21.db';
import NWL2020 from './databases/NWL2020.db';

export enum Dictionary {
  NWL2020 = 'NWL2020',
  CSW21 = 'CSW21',
}

async function getFileInfoAsync(filename: string) {
  return await FileSystem.getInfoAsync(
    `${FileSystem.documentDirectory}${filename}`
  );
}

async function openDatabaseAsync(dictionary: Dictionary) {
  const sqliteDirectory = await getFileInfoAsync('SQLite');

  if (!sqliteDirectory.exists) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite'
    );
  }

  const databaseFile = await getFileInfoAsync(`SQLite/${dictionary}.db`);

  if (!databaseFile.exists) {
    if (dictionary === Dictionary.NWL2020) {
      await FileSystem.downloadAsync(
        Asset.fromModule(NWL2020).uri,
        `${FileSystem.documentDirectory}SQLite/${dictionary}.db`
      );
    } else if (dictionary === Dictionary.CSW21) {
      await FileSystem.downloadAsync(
        Asset.fromModule(CSW21).uri,
        `${FileSystem.documentDirectory}SQLite/${dictionary}.db`
      );
    }
  }

  return SQLite.openDatabase(`${dictionary}.db`);
}

export async function lookUpWordAsync(
  dictionary: Dictionary = Dictionary.NWL2020,
  word: string
): Promise<{ word: string; definition: string | null }> {
  const db = await openDatabaseAsync(dictionary);

  return new Promise((resolve, reject) => {
    try {
      db.exec(
        [
          {
            sql: `select * from words where word = "${word.toUpperCase()}";`,
            args: [],
          },
        ],
        false,
        (_: any, data: any) => {
          if (data?.[0].error) {
            reject(data?.[0].error);
          }

          resolve(data[0].rows?.[0] ?? null);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
