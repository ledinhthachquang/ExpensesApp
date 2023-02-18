import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DocumentPicker, DocumentPickerUtil } from 'expo';
import * as XLSX from 'xlsx';
import { db } from '../firebase';

const ImportScreen = () => {
  const [fileData, setFileData] = useState(null);
  const [fileError, setFileError] = useState(null);

  const importFile = async () => {
    try {
      const result = await DocumentPicker.show({
        filetype: [DocumentPickerUtil.allFiles()],
      });

      if (result.type === 'cancel') {
        // User cancelled file selection
        return;
      }

      // Load file data into memory
      const fileData = await XLSX.read(await result.uri, { type: 'file' });
      const sheet = fileData.Sheets[fileData.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Validate file format
      const expectedHeaders = ['Date', 'Description', 'Amount'];
      const actualHeaders = rows[0];

      if (JSON.stringify(actualHeaders) !== JSON.stringify(expectedHeaders)) {
        setFileError('File does not match expected format.');
        return;
      }

      // Convert rows to Firebase format
      const transactions = rows.slice(1).map(row => ({
        date: row[0],
        description: row[1],
        amount: parseFloat(row[2]),
        timestamp: new Date().getTime(),
      }));

      // Upload data to Firestore
      await Promise.all(
        transactions.map(transaction => db.collection('expense').add(transaction))
      );

      setFileData(transactions.length);
      setFileError(null);
    } catch (error) {
      setFileError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Import Transactions</Text>
      <TouchableOpacity style={styles.importButton} onPress={importFile}>
        <Text style={styles.importButtonText}>Choose File</Text>
      </TouchableOpacity>
      {fileData && (
        <Text style={styles.successMessage}>Imported {fileData} transactions.</Text>
      )}
      {fileError && <Text style={styles.errorMessage}>{fileError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  importButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
  },
  importButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});


export default ImportScreen;
