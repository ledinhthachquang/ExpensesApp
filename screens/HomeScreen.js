import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Avatar, ListItem } from "react-native-elements";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import CustomListItem from "../components/CustomListItem";

import { Entypo } from '@expo/vector-icons';

import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert(error.message));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Money App",
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
          <Text style={{ padding: 10 }}>
          <Entypo name="log-out" size={25} color="white" />
              </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setCurrentDate(date + "/" + month + "/" + year);
  }, []);

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  Date.prototype.getDayName = function () {
    return days[this.getDay()];
  };
  var now = new Date();

  var today = now.getDayName();

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />
        {/* <LinearGradient
          colors={["#F9D48D", "#F8EDD8"]}
          style={styles.linearGradient}
        > */}
        <View
          style={{
            flexDirection: "row",
            margin: 14,
            paddingBottom: 10,
            paddingTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#353535",

            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                color: "#353535",
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              {today}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#353535",
                opacity: 0.6,
                textTransform: "uppercase",
              }}
            >
              {currentDate}
            </Text>
          </View>
          <View style={styles.fullName}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold",fontSize:16 }}>Welcome</Text>
              <Text h4 style={{ color: "#4A2D5D" }}>
                {auth.currentUser.displayName}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{ textAlign: "center", color: "#000", fontSize: 20 }}>
              Total Balance
            </Text>
            <Text h3 style={{ textAlign: "center", color: "#000" }}>
              {totalBalance}đ
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View
              style={{
                backgroundColor: "#00A86B",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 25,
                color: "#fff",
                padding: 10,
              }}
            >
              <Text style={{ padding: 10 }}>
                <Icon name="download" size={30} color="#fff" />
              </Text>
              <View>
                <Text style={{ color: "#fff", fontSize: 20 }}>Income</Text>
                <Text
                  style={{ color: "#fff", fontSize: 20 }}
                >{` ${income}`}đ</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FD3C4A",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 25,
                color: "#fff",
                padding: 10,
              }}
            >
              <Text style={{ padding: 10 }}>
                <Icon name="upload" size={30} color="#fff" />
              </Text>
              <View>
                <Text style={{ color: "#fff", fontSize: 20 }}>Espence</Text>
                <Text style={{ color: "#fff", fontSize: 20 }}>
                  
                  {` ${expense}`}đ
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recentTitle}>
          <Text h4 style={{ color: "#4A2D5D" }}>
            Recent Transactions
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("All")}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {filter?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {filter?.slice(0, 4).map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info.data}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.containerNull}>
            <FontAwesome5 name="list-alt" size={24} color="#EF8A76" />
            <Text h4 style={{ color: "#4A2D5D" }}>
              No Transactions
            </Text>
          </View>
        )}
      </View>
      <View style={styles.addButton}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Home")}
        >
          <AntDesign name="home" size={24} color="#66AFBB" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Chart")}
        >
          <AntDesign name="piechart" size={24} color="black" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate("Add")}
          activeOpacity={0.5}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("All")}
        >
          <FontAwesome5 name="list-alt" size={24} color="#EF8A76" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="ios-person-circle-outline" size={30} color="#00A86B" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF6E5",
    flex: 1,
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    padding: 10,
  },
  fullName: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 20,
  },
  cardTop: {
    // backgroundColor: 'blue',
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    margin: "auto",
    // backgroundColor: "#E0D1EA",
    borderRadius: 5,
  },
  cardBottomSame: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recentTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  recentTransactions: {
    backgroundColor: "white",
    width: "100%",
  },
  seeAll: {
    fontWeight: "bold",
    color: "green",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  plusButton: {
    backgroundColor: "#535F93",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  containerNull: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
});
