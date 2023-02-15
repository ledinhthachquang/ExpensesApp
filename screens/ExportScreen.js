import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { captureRef } from 'react-native-view-shot';
const transactionData = [
    {
      id: '1',
      date: '2022-02-12',
      description: 'Groceries',
      amount: '$50.00',
    },
    {
      id: '2',
      date: '2022-02-10',
      description: 'Gas',
      amount: '$30.00',
    },
    {
      id: '3',
      date: '2022-02-05',
      description: 'Dinner',
      amount: '$75.00',
    },
  ];
const ExportScreen = () => {
    const listRef = useRef(null);

    const exportList = async () => {
      const listImage = await captureRef(listRef, {
        format: 'jpg',
        quality: 0.8,
        result: 'data-uri',
      });
      // do something with the captured list image
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text style={styles.itemDate}>{item.date}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemAmount}>{item.amount}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <FlatList
          data={transactionData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ref={listRef}
        />
        <TouchableOpacity style={styles.exportButton} onPress={exportList}>
          <Text style={styles.exportButtonText}>Export List</Text>
        </TouchableOpacity>
        {/* Display the captured image here */}
        {/* <Image source={{ uri: capturedListImage }} /> */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5fcff',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemDate: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    itemDescription: {
      flex: 1,
      marginLeft: 16,
    },
    itemAmount: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    exportButton: {
      backgroundColor: '#3498db',
      padding: 16,
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 20,
    },
    exportButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });


export default ExportScreen