import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView,TouchableOpacity, TextInput,Image} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'
import {db, auth} from '../firebase'
import firebase from 'firebase'

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Expense',
    })
  }, [navigation])
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const createExpense = () => {
    if (input && amount && selDate && selectedLanguage && auth && selectedCategory) {
      setSubmitLoading(true)
      db.collection('expense')
        .add({
          email: auth.currentUser.email,
          text: input,
          price: amount,
          date: selDate,
          type: selectedLanguage,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
          category:selectedCategory,

        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }

  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedLanguage('expense')
    setSelectedCategory('expense')
    navigation.navigate('Home')
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
  const [selectedLanguage, setSelectedLanguage] = useState('expense')
  const [selectedCategory, setSelectedCategory] = useState('expense')
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.inputContainer}>

      <View style={styles.amountContainer}>
      
      <TouchableOpacity>
        <Image source={require('./../assets/bi_currency-rupee.png')} style={styles.icon1} />
      </TouchableOpacity>
      <TextInput
           style={[styles.textInput,styles.shadow]}
          keyboardType='numeric'
          placeholder='Add Amount'
          value={amount}
          onChangeText={(text) => setAmount(text)}
          placeholderTextColor="#ccc"
        />
      </View>
      <View style={[styles.selectContainer,styles.shadow]}>
      <Text style={styles.title}>Add Description</Text>
        <View style={styles.border}>
        <TextInput
          style={styles.input1}
          placeholder='Add Discription'
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="#ccc"
        />
        </View>
      
        <Text style={styles.title}>Pick Your Date</Text>
      <View style={styles.border}>
        {show && (
        
        <DateTimePicker
          testID='dateTimePicker'
          value={selDate}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      
        )}

       

        <Text
          style={styles.input1}
          placeholder='Select Date'
          value={result}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>
        </View>
        {/* <View style={styles.border}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label='Expense' value='expense' />
          <Picker.Item label='Income' value='income' />
        </Picker>
        </View> */}
        
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
          {/* <View style={styles.selectRow}>
          <Text style={styles.title}>Category</Text>
          
          </View> */}
          <Text style={styles.title}>Category</Text>
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
          containerStyle={[styles.button,styles.submitButton]}
          title='Add'
          color="#1E6738"
          onPress={createExpense}
          loading={submitLoading}
        /> */}
      </View>
      <View style ={styles.buttonContainer}>
      <TouchableOpacity
            style={[styles.button,styles.submitButton]}
            onPress={createExpense}
            loading={submitLoading}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
      </View>
     
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6E5',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    // justifyContent: 'flex-start',
    width:330,
    padding: 10,
  },
  inputContainer: {
    width: '100%',
    display:'flex',
    flexDirection:'column'
  },
  
  input: {
    height: 80,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  input1:{
    height: 33,
    borderColor: 'gray',
    // borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 280,
    marginTop: 17,
    backgroundColor: 'pink',
  },
  selectContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent:'center',
    // justifyContent: 'flex-start',
    width:330,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FDFCFC',
    // borderTopStartRadius: 50,
    // borderTopEndRadius:50,
    padding: 10,
    width: '100%',
    
    marginTop:38
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
    borderWidth: 6,
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
    borderRadius: 16,
    padding: 12,
    margin: 10,
    width:'95%',
    // textAlign:'center'
  },
  border: {
    // lineHeight:8,
    marginTop:16,
    borderWidth: 1,
    borderColor: '#262653',
    borderRadius: 16,
    padding: 7,
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
  textInput: {
    flex:1,
    padding: 10,
    width: '100%',
    marginTop: 10,
    marginLeft:10,
    // fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    lineHeight:28,
    // borderWidth:0, 
    borderBottomWidth:2,
    borderBottomColor:'gray',
    // borderBottomColor:'transparent'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    },
    
})

