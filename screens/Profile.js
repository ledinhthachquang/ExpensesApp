import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ToastAndroid,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../firebase";
import { Avatar, ListItem } from "react-native-elements";

export default function Profile({ navigation }) {
  //   const { name, accountName, profileImage } = route.params;
  const ToastMessenger = () => {
    ToastAndroid.show("Edit Successfully", ToastAndroid.SHORT);
  };

 
  const [image, setImage] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonNumber] = useState('00000');
  const [imageUrl, setImageUrl] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  // transactions
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("expense")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) =>
          setTransactions(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ) &
          setTotalIncome(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == "income"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalExpense(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == "expense"
                ? doc.data().price
                : 0
            )
          )
      );

    return unsubscribe;
  }, []);

  // stufff
  const [totalIncome, setTotalIncome] = useState([]);
  const [income, setIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState([]);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  useEffect(() => {
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0);
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0);
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
  }, [totalIncome, totalExpense, income, expense]);

  useEffect(() => {
    if (income || expense) {
      setTotalBalance(income - expense);
    } else {
      setTotalBalance(0);
    }
  }, [totalIncome, totalExpense, income, expense]);

  const [filter, setFilter] = useState([]);
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth.currentUser.email
        )
      );
    }
  }, [transactions]);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //     setImageUrl(result.assets[0].uri);
  //   }
  // };
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection('users')
  //     .doc(itemId)
  //     .onSnapshot(
  //       (snapshot) =>
  //         setFullName(snapshot.data()?.displayName) &
  //         setEmail(snapshot.data()?.email) &
  //         setImageUrl(snapshot.data()?.photoURL)
  //     )
  //   return unsubscribe
  // }, [])
  // const updateProfile = () => {
  //   if (fullName && email && imageUrl ) {
  //     setSubmitLoading(true)
  //     db.collection('users')
  //       .doc(itemId)
  //       .update({
  //         displayName:fullName,
  //         email:email,
  //         photoURL:imageUrl,
  //       })
  //       .then(() => clearInputFields())
  //       .catch((error) => alert(error.message))
  //   } else {
  //     setSubmitLoading(false)
  //     alert('All fields are mandatory')
  //   }
  // }
  const user = auth.currentUser;


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.top}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{ height: 150, width: 150 }}
              size="medium"
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
            <View>
              <Text h4 style={{ fontSize: 30, fontWeight: "bold", margin: 15 }}>
                {user.displayName}
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: 20,
                }}
                onPress={() => navigation.navigate("EditProfile")}
              >
                {/* <Text style={styles.userBtnTxt}>Edit</Text> */}
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, borderBottomColor: "black", borderBottomStyle: "solid", borderBottomWidth: 1 }}>
          {/* <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                opacity: 0.5,
                paddingRight: 20,
              }}
            >
              <Ionicons name="person-outline" size={24} color="#00A86B" />
            </Text>
            <TextInput
              placeholder={user.displayName}
              //   defaultValue={name}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
                paddingTop: 5,
              }}
            />
          </View> */}

          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                opacity: 0.5,
                paddingRight: 20,
              }}
            >
              <Ionicons name="mail-open-outline" size={24} color="black" />
            </Text>
            <Text>{user.email}</Text>
            
          </View>

          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                opacity: 0.5,
                paddingRight: 20,
              }}
            >
              <Feather name="phone-forwarded" size={24} color="black" />
            </Text>
            <Text>{phonenumber}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", paddingTop: 20 }}>
          <Button
            title="Done"
            onPress={() => {
              {
                /** ToastMessenger(); */
              }
              navigation.goBack();
            }}
            color="#00A86B"
          />
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: "row", marginLeft: 30 ,alignItems:"center"}}>
        <Text h4 style={{ color: "#4A2D5D" }}>
          <Ionicons name="md-wallet-outline" size={30} color="#00A86B" />
        </Text>
        <Text> {totalBalance}</Text>
      </View>
      <View style={{ margin: 20 }}>
        <TouchableOpacity
         activeOpacity={0.5}
         onPress={() => navigation.navigate("Import")}
        >
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
              }}
            >
              <Fontisto name="import" size={24} color="#00A86B" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.featureName}>Import</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Export")}
        >
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
              }}
            >
              <FontAwesome5 name="file-export" size={24} color="#00A86B" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.featureName}>Export</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
              }}
            >
              <FontAwesome name="cog" size={24} color="#00A86B" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Setting")}
        >
          <Text style={styles.featureName}>Setting</Text>
        </TouchableOpacity>
              
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
              }}
            >
              <FontAwesome name="question-circle-o" size={24} color="#00A86B" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Help")}
        >
          <Text style={styles.featureName}>Help</Text>
        </TouchableOpacity>
              
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFE2E4",
                padding: 10,
              }}
            >
              <MaterialIcons name="logout" size={24} color="#FD3C4A" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              
              <Text style={styles.featureName}>Logout</Text>
              
              
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{ margin: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
                borderRadius: "20%",
              }}
            >
              <Icon name="wallet" size={25} color="#00A86B" />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.featureName}>Account</Text>
            </View>
          </View>
        </TouchableOpacity>

        

        <TouchableOpacity>
          <View style={styles.featureBox}>
            <View
              style={{
                backgroundColor: "#FFF6E5",
                padding: 10,
                
              }}
            >
              <FontAwesome name="cog" size={24} color="#00A86B" />
             
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.featureName}>Setting</Text>
            </View>
          </View>
        </TouchableOpacity>

       

        

        

       
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF6E5",
  },
  // top: {

  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: 10,
  // },
  inforBox: {
    flex: 1,
    alignItems: "left",
    margin: 20,
    flexDirection: "row",
  },
  featureBox: {
    flexDirection: "row",
    marginVertical: 10,
  },
  featureName: {
    fontSize: 18,
  },
});
