import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { db, auth } from '../firebase';

const ExportScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [fileFormat, setFileFormat] = useState(null);
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .where('email', '==', auth.currentUser.email)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const exportData = async () => {
    if (!fileFormat) {
      Alert.alert('File Format not selected', 'Please select a file format to export.');
      return;
    }
    const fileName = `transactions_${new Date().toISOString()}.${fileFormat}`;
    const csvData = transactions.map(({ data }) => {
      const { text, price, date, type, userDate, category } = data;
      return `${text},${price},${date},${type},${userDate},${category}`;
    }).join('\n');
    try {
      const fileUri = FileSystem.cacheDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, csvData);
      await Sharing.shareAsync(fileUri, { mimeType: `text/${fileFormat}` });
    } catch (error) {
      Alert.alert('Export Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Export Transactions</Text>
      <Text style={styles.label}>Select File Format:</Text>
      <View style={styles.formatSelector}>
        <TouchableOpacity
          style={[styles.formatButton, fileFormat === 'csv' && styles.formatButtonSelected]}
          onPress={() => setFileFormat('csv')}
        >
          <Text style={styles.formatButtonText}>CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formatButton, fileFormat === 'qif' && styles.formatButtonSelected]}
          onPress={() => setFileFormat('qif')}
        >
          <Text style={styles.formatButtonText}>QIF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formatButton, fileFormat === 'xml' && styles.formatButtonSelected]}
          onPress={() => setFileFormat('xml')}
        >
          <Text style={styles.formatButtonText}>XML</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.exportButton} onPress={exportData}>
        <Text style={styles.exportButtonText}>Export</Text>
      </TouchableOpacity>
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
  formatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  selectedFormatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  exportButton: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 30,
  },
  exportButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default ExportScreen
