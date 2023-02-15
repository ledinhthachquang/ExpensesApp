import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView,TouchableOpacity, TextInput,Image} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import {db, auth} from '../firebase'
import firebase from 'firebase'




const TransactionDetail = () => {
  const transaction = {
    id: 1,
    amount: '$120',
    note:'Buy some grocery',
    date: '01/01/2022',
    time: '16:20',
    description: 'Shopping at the mall',
    type: 'Expense',
    category: 'Shopping'
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header,styles.shadow]}>
      <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Image source={require('./../assets/arrow-left.png')} style={styles.icon} />
        </TouchableOpacity>
       
      <Text style={styles.title}>Detail Transaction</Text>
        <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Image source={require('./../assets/trash.png')} style={styles.icon} />
        </TouchableOpacity>
       
      </View>
      <View style={[styles.amountContainer,styles.shadow]}>
        <Text style={styles.amount}>
          {transaction.amount}
        </Text>
        <View style={styles.noteContainer}>
          <Text style={styles.note}>
            {transaction.note}
            </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {transaction.date}
          </Text>
          <Text style={styles.time}>
            {transaction.time}
            </Text>
        </View>
      </View>
      <View style={[    styles.typeContainer,styles.shadow]}>
        <View style={styles.type}>
          <Text style={{color:'#91919F',fontWeight:500}}>Type</Text>
          <Text style={styles.highlight}>
            {transaction.type}
            </Text>
        </View>
        <View style={styles.category}>
          <Text style={{color:'#91919F',fontWeight:500}}>Category</Text>
          <Text style={styles.highlight}>
            {transaction.category}
            </Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.descriptionContainer}>
        <Text style={{color:'#91919F'}}>Discription</Text>
        <Text style={styles.description}>
          {transaction.description}
          </Text>
      </View>
      <View style={styles.editButtonContainer}>
        <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => handleEdit(transaction)}
            >
        <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

//     const mockTransaction = {
//       id: 1,
//       amount: '$50.00',
//       note: 'Groceries',
//       date: '11/20/2020',
//       time: '3:00 PM',
//       type: 'Expense',
//       category: 'Food & Drinks',
//       description: 'Weekly groceries' 
//     };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'FD3C4A',
    alignItems: 'center',
    
  },
  header: {
    width : '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FD3C4A',
    gap: 54,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    color : 'white'
  },
  title: {
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    // fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: '#FFFFFF'
  },
  amountContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:'100%',
    backgroundColor: '#FD3C4A',
    padding: 20,
    // borderBottomWidth: 3,
    gap:2,
    // borderBottomColor: 'black',
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24
  },
  amount: {
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    color: '#FCFCFC',
    fontSize: 48,
    lineHeight:80,
    // fontWeight: 700,
  },
  highlight:{
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    lineHeight:18,
    // fontWeight: 800,
  },
  noteContainer: {
    // padding: 20,
    flexDirection:'row',
    alignItems:"center",
  },
  note: {
    fontSize: 16,
    // fontWeight:500,
    color: '#FCFCFC',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    gap:2,
    marginBottom:6  
  },
  date: {
    color: 'lightgray',
    fontSize: 14,
    // marginTop: 10,
  },
  time: {
    color:"lightgray",
    fontSize: 16,
    marginLeft: 10,
    // margin:4
  },
  typeContainer: {
    position: 'absolute',
    top: 240,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    // backgroundColor: 'white',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: 'lightblack',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    margin: 10,
  },
  type: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    // borderRightWidth: 1,
    // borderRightColor: 'black',
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    
  },
  category: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10,
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    // fontWeight:400,
  },
  divider: {
    borderBottomWidth:4.5,
    borderStyle:'dashed',
    borderBottomColor:'#D8D8D8',
    marginVertical:15,
    padding:15,
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
  },
  descriptionContainer: {
    width:'100%',
    flex: 2,
    backgroundColor: 'white',
    padding: 20,
  },
  description: {
    color: 'lightblack',
    fontSize: 16,
    // fontFamily: 'Inter',
    fontStyle: 'normal',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
    // background:'7F3DFF'
  },
  editButton: {
    backgroundColor: '#7F3DFF',
    borderRadius: 8,
    padding: 8,
    margin: 10,
    width:303,

  },
  editButtonText: {
    color: 'white',
    // fontWeight: 'bold',
    textAlign:"center"
    
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  }
});

export default TransactionDetail