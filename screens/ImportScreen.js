import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { db, auth } from '../firebase';

const ImportScreen = () => {
  const [fileData, setFileData] = useState(null);
  const [fileFormat, setFileFormat] = useState(null);

  const importData = async () => {
    if (!fileData || !fileFormat) {
      Alert.alert('File not selected', 'Please select a file to import.');
      return;
    }
    if (fileFormat === 'csv') {
      // Parse CSV data and save to database
      const transactions = fileData.split('\n').map((line) => {
        const [text, price, date, type, userDate, category] = line.split(',');
        return { text, price, date, type, userDate, category };
      });
      try {
        const batch = db.batch();
        transactions.forEach((transaction) => {
          batch.set(db.collection('expense').doc(), {
            ...transaction,
            email: auth.currentUser.email,
            timestamp: new Date(),
          });
        });
        await batch.commit();
        Alert.alert('Import successful');
      } catch (error) {
        Alert.alert('Import failed', error.message);
      }
    } else if (fileFormat === 'qif') {
      // TODO: Parse QIF data and save to database
      Alert.alert('Unsupported file format', 'QIF import is not supported yet.');
    } else if (fileFormat === 'xml') {
      // TODO: Parse XML data and save to database
      Alert.alert('Unsupported file format', 'XML import is not supported yet.');
    }
  };

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'text/*' });
      if (result.type === 'cancel') {
        return;
      }
      const fileData = await FileSystem.readAsStringAsync(result.uri);
      const fileFormat = result.name.split('.').pop();
      setFileData(fileData);
      setFileFormat(fileFormat);
    } catch (error) {
      Alert.alert('File selection failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Import Transactions</Text>
      <TouchableOpacity style={styles.selectButton} onPress={selectFile}>
        <Text style={styles.selectButtonText}>Select File</Text>
      </TouchableOpacity>
      {fileData && (
        <>
          <Text style={styles.label}>Selected File:</Text>
          <Text style={styles.fileData}>{fileData.substring(0, 100)}...</Text>
          <Text style={styles.label}>Selected File Format: {fileFormat}</Text>
          <TouchableOpacity style={styles.importButton} onPress={importData}>
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
        </>
      )}
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  formatSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  formatButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
  },
  selectedFormatButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 5,
  },
  fileData: {
    fontSize: 16,
    marginTop: 30,
  },
  selectButton: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 15,
    marginTop: 30,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 18,
  },
  importButton: {
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 15,
    marginTop: 30,
  },
  importButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    padding: 15,
    marginTop: 30,
  },
  cancelButtonText: {
    color: '#2196F3',
    fontSize: 18,
  },
});

export default ImportScreen;

   
