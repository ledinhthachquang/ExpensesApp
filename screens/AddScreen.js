import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { Text, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import format from "date-fns/format";
import { Picker } from "@react-native-picker/picker";
import { db, auth } from "../firebase";
import firebase from "firebase";
import { Ionicons } from '@expo/vector-icons';


const AddScreen = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Transaction",
    });
  }, [navigation]);
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const createExpense = () => {
    if (
      input &&
      amount &&
      selDate &&
      selectedLanguage &&
      auth &&
      selectedCategory
    ) {
      setSubmitLoading(true);
      db.collection("expense")
        .add({
          email: auth.currentUser.email,
          text: input,
          price: amount,
          date: selDate,
          type: selectedLanguage,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
          category: selectedCategory,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message));
    } else {
      alert("All fields are mandatory");
      setSubmitLoading(false);
    }
  };

  const clearInputFields = () => {
    alert("Created Successfully");
    setInput("");
    setAmount("");
    setSelDate(new Date());
    setSelectedLanguage("expense");
    setSelectedCategory("expense");
    navigation.navigate("Home");
    setSubmitLoading(false);
  };
  // Date Picker
  const [selDate, setSelDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setSelDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const result = format(selDate, "dd/MM/yyyy");

  // Select Dropdown
  const [selectedLanguage, setSelectedLanguage] = useState("expense");
  const [selectedCategory, setSelectedCategory] = useState("education");


  const expenseCategories = [
    { label: "🎓 Education", value: "education", icon: "md-school" },
    { label: "🎮 Entertainment", value: "entertainment", icon: "md-game-controller-b" },
    { label: "👗 Clothes", value: "clothing", icon: "md-shirt" },
    { label: "🍜 Food", value: "food", icon: "md-restaurant" },
    { label: "📦 Other", value: "other", icon: "md-options" }
  ];
  
  const incomeCategories = [
    { label: "💰 Salary", value: "salary", icon: "md-cash" },
    { label: "🏦 Investment", value: "investment", icon: "md-trending-up" },
    { label: "💵 Gift", value: "gift", icon: "md-gift" },
    { label: "🪙 Bonus", value: "bonus", icon: "md-gift" },
    { label: "📦 Other", value: "other", icon: "md-options" }
  ];
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.amountContainer}>
            <TextInput
              style={[styles.textInput, styles.shadow]}
              textAlign={"center"}
              keyboardType="numeric"
              placeholder="Add Amount"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              placeholderTextColor="#ccc"
            />
            <FontAwesome5 name="coins" size={25} style={{ marginLeft: 10 }} />
          </View>
          <View style={styles.line} />
          <View style={[styles.selectContainer, styles.shadow]}>
            <View style={styles.items}>
              <Text style={styles.title}>Description</Text>
              <View style={{ marginLeft: 30 }}>
                <TextInput
                  style={[styles.input1, {}]}
                  placeholder="Add Description..."
                  value={input}
                  onChangeText={(text) => setInput(text)}
                  placeholderTextColor="#ccc"
                />
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.items}>
              <Text style={styles.title}>Pick Your Date</Text>
              <View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={selDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <Text
                  style={styles.input1}
                  placeholder="Select Date"
                  value={result}
                  onPress={showDatepicker}
                  // editable={false}
                >
                  {result ? result : new Date()}
                </Text>
              </View>
            </View>
            <View style={styles.line} />


            <View style={[styles.transactionTypeContainer]}>
              <TouchableOpacity
                style={
                  selectedLanguage === "expense"
                    ? styles.selectedExpense
                    : styles.expenseButton
                }
                onPress={() => {setSelectedLanguage("expense");
                                setSelectedCategory("education")
              }
              }
              >
                <Text style={styles.buttonText}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  selectedLanguage === "income"
                    ? styles.selectedIncome
                    : styles.incomeButton
                }
                onPress={() => {

                  setSelectedLanguage("income")
                  setSelectedCategory("salary")

                }}
              >
                <Text style={styles.buttonText}>Income</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
  <View style={{ marginTop: 10, marginLeft: 10 }}>
    <Text style={styles.title}>Category</Text>
    <View>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemCategory, itemIdx) => setSelectedCategory(itemCategory)}
        // onValueChange={(category, index) => setSelectedCategory(category)}
      >
        {selectedLanguage === "expense"
          ? expenseCategories.map((category, index) => (
              <Picker.Item 
                key={index} 
                label={category.label} 
                value={category.value} 
                icon={category.icon} 
                // icon={<Ionicons name={category.iconName} />} 
              />
            ))
          : incomeCategories.map((category, index) => (
              <Picker.Item 
                key={index} 
                label={category.label} 
                value={category.value} 
                icon={<Ionicons name={category.iconName} />} 
              />
            ))}
      </Picker>
    </View>
  </View>

          </View>
          <View style={styles.line} />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={createExpense}
          loading={submitLoading}
        >
          <Text
            style={[styles.buttonText, { fontWeight: "bold", fontSize: 17 }]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6E5",
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  textInput: {
    fontSize: 30,
  },
  title: {
    fontWeight: "bold",
    opacity: 0.5,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    // height:'10%',
    opacity: 0.05,
  },
  selectContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  input1: {
    textAlign: "right",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  transactionTypeContainer: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
    gap: 15,
  },
  incomeButton: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 10,
  },
  selectedIncome: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 6,
    borderColor: "#00A86B",
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 10,
  },
  expenseButton: {
    backgroundColor: "#FD3C4A",
    padding: 15,
    borderRadius: 10,
  },
  selectedExpense: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 4,
    borderColor: "#FD3C4A",
    backgroundColor: "#FD3C4A",
    padding: 15,
    borderRadius: 10,
  },
  border: {
    // lineHeight:8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#262653",
    borderRadius: 16,
    padding: 7,
    color: "#26265C",
    fontWeight: "bold",
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  submitButton: {
    // padding: 18,
    gap: 10,
    backgroundColor: '#7F3DFF',
    borderRadius: 20,
    padding: 12,
    margin: 10,
    width: "95%",
    bottom: 0,
    // textAlign:'center'
  },
});