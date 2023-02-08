import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TextInput,TouchableOpacity} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import {db} from '../firebase'
import firebase from 'firebase'
import parse from 'date-fns/parse'

const UpdateScreen = ({route, navigation}) => {
  const [transactions, setTransactions] = useState([])
  const {itemId} = route.params
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Update Expense',
    })
  }, [navigation])
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .doc(itemId)
      .onSnapshot(
        (snapshot) =>
          setInput(snapshot.data()?.text) &
          setAmount(snapshot.data()?.price) &
          setSelDate(
            parse(snapshot.data()?.userDate, 'dd/MM/yyyy', new Date())
          ) &
          setSelectedLanguage(snapshot.data()?.type) &
          setSelectedCategory(snapshot.data()?.category)
      )
    return unsubscribe
  }, [])

  const updateExpense = () => {
    if (input && amount && selDate && selectedLanguage && selectedCategory) {
      setSubmitLoading(true)
      db.collection('expense')
        .doc(itemId)
        .update({
          text: input,
          price: amount,
          date: selDate,
          type: selectedLanguage,
          category: selectedCategory,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      setSubmitLoading(false)
      alert('All fields are mandatory')
    }
  }

  const clearInputFields = () => {
    alert('Updated Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedLanguage('expense')
    setSelectedCategory('expense')
    navigation.goBack()
    setSubmitLoading(false)
  }

  // Date Picker
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }

  const result = format(selDate, 'dd/MM/yyyy')

  // Select Dropdown
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [selectedCategory, setSelectedCategory] = useState()

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.inputContainer}>
      <View style={[styles.selectContainer,styles.shadow]}>
        <TextInput
          style={styles.input}
          placeholder='Add Text'
          value={input}
          // defaultValue={transactions.text}
          onChangeText={(text) => setInput(text)}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={selDate}
            mode={mode}
            defaultValue={transactions?.date}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Add Amount'
          value={amount}
          onChangeText={(text) => setAmount(text)}
          defaultValue={transactions.price}
        />

        <Text
          style={styles.input}
          placeholder='Select Date'
          onPress={showDatepicker}
        >
          {result ? result : new Date()}
        </Text>

        <View style={[styles.transactionTypeContainer]}>
          
          <TouchableOpacity
              style={selectedLanguage === 'expense' ? styles.selectedExpense : styles.expenseButton}
              onPress={() => setSelectedLanguage('expense')}>
              <Text style={styles.buttonText}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={selectedLanguage === 'income' ? styles.selectedIncome : styles.incomeButton}
              onPress={() => setSelectedLanguage('income')}>
              <Text style={styles.buttonText}>Income</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.border}>
          <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemCategory,itemIdx) =>
          setSelectedCategory(itemCategory)}
        >
          <Picker.Item label='Education' value='education' />
          <Picker.Item label='Nutrition' value='nutrition' />
          <Picker.Item label='Clothing' value='clothing' />
          <Picker.Item label='Food' value='food' />
          <Picker.Item label='Other' value='other' />
        </Picker>
          </View>
      

        {/* <Button
          containerStyle={styles.button}
          title='Update'
          onPress={updateExpense}
          loading={submitLoading}
        /> */}

      </View>
      <View style ={styles.buttonContainer}>
        <TouchableOpacity
            style={[styles.button,styles.submitButton,styles.shadow]}
            onPress={updateExpense}
            loading={submitLoading}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
      </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default UpdateScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6E5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  transactionTypeContainer: {
    margin:15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'transparent',
    gap:15
  },
  incomeButton: {
    backgroundColor: '#00A86B',
    padding: 15,
    borderRadius: 5,
  },
  selectedIncome: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 4,
    borderColor: '#00A86B',
    backgroundColor: '#00A86B',
    padding: 15,
    borderRadius: 5,
    },
  expenseButton: {
    backgroundColor: '#FD3C4A',
    padding: 15,
    borderRadius: 5,
  },
  selectedExpense: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 4,
    borderColor: '#FD3C4A',
    backgroundColor: '#FD3C4A',
    padding: 15,
    borderRadius: 5,
    },
    buttonText: {
      textAlign:'center',
      color: 'white',
      fontWeight: 'bold',
    },
    submitButton: {
 
      // padding: 18,
      gap: 10,
      backgroundColor: '#7F3DFF',
      borderRadius: 8,
      padding: 12,
      // margin: 10,
      width:'100%',
      // textAlign:'center'
    },
    border: {
      borderWidth: 1,
      borderColor: '#262653',
      borderRadius: 16,
      padding: 10,
      color: '#26265C',
      fontWeight: 'bold',
      
    },
    shadow:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    selectContainer: {
     
      backgroundColor: '#FDFCFC',
      // borderTopStartRadius: 50,
      // borderTopEndRadius:50,
      padding: 10,
      width: '100%',
      height:'70%',
      marginTop:38
    },
})