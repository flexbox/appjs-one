import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import {
  ResultSet,
  ResultSetError,
  SQLResultSet,
  SQLTransaction,
} from 'expo-sqlite';

import CSW21 from '../assets/databases/CSW21.db';
import NWL2020 from '../assets/databases/NWL2020.db';

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

  alert(`1. ${JSON.stringify(sqliteDirectory)}`);
  alert(`2. ${JSON.stringify(dictionary)}`);

  if (!sqliteDirectory.exists) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'SQLite'
    );
  }

  const databaseFile = await getFileInfoAsync(`SQLite/${dictionary}.db`);

  alert(`3. ${JSON.stringify(databaseFile)}`);

  if (!databaseFile.exists) {
    if (dictionary === Dictionary.NWL2020) {
      alert(`4. Downlading NWL2020.db`);
      await FileSystem.downloadAsync(
        Asset.fromModule(NWL2020).uri,
        `${FileSystem.documentDirectory}SQLite/${dictionary}.db`
      );
    } else if (dictionary === Dictionary.CSW21) {
      alert(`5. Downlloading CSW21.db`);
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

  alert(`6. ${JSON.stringify(db)}`);

  try {
    alert('calling trasnaction');
    db.transaction(
      function success(tx) {
        alert('executing sql');
        tx.executeSql(
          'select * from words limit 2;',
          [],
          (trans, result) => {
            alert(`9. ${JSON.stringify(result)}`);
            alert(`10. ${JSON.stringify(trans)}`);
          },
          (transaction: any, error: any) => {
            alert(`11. ${error}`);
            alert(`11a. ${JSON.stringify(transaction)}`);
            return true;
          }
        );
      },
      function error(error: any) {
        alert(`12. ${error}`);
        // TODO: Error: Error code 26: file is not a database
      }
    );
  } catch (error) {
    alert(`13. ${error}`);
  }

  // return new Promise((resolve, reject) => {
  // try {
  //   db.exec(
  //     // [
  //     //   {
  //     //     sql: `select * from words where word = (?);`,
  //     //     args: [word.toUpperCase()],
  //     //   },
  //     // ],
  //     [
  //       {
  //         sql: `select * from words limit 2;`,
  //         args: [],
  //       },
  //     ],
  //     false,
  //     (error?: Error | null, resultSet?: (ResultSetError | ResultSet)[]) => {
  //       alert(`7. ${JSON.stringify(resultSet)}`);
  //       alert(`8. ${JSON.stringify(error)}`);

  //       // if (error || !resultSet) {
  //       //   return reject(error);
  //       // }

  //       // return resolve(resultSet[0].rows?.[0] ?? null);
  //     }
  //   );
  // } catch (error) {
  //   alert(`8a. ${JSON.stringify(error)}`);
  //   // return reject(error);
  // }
  // });
}
