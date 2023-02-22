import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { VictoryPie, VictoryLabel } from "victory-native";
import { VictoryTooltip } from "victory-tooltip";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { useState } from "react";
import { auth, db } from "../firebase";
import { Ellipse, Svg } from "react-native-svg";
// import * as Svg from 'react-native-svg';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { set } from "date-fns";

const ChartScreen = () => { 
  // dummy data
  
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
          setTotalFood(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.category == "food"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalEnterTaiment(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.category == "entertainment"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalClothing(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.category == "clothing"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalEducation(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.category == "education"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalOthers(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.category == "other"
                ? doc.data().price
                : 0
            )
          ) &
          setTotalIncome(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email &&
              doc.data()?.type == "income"
                ? doc.data().price
                : 0
            )
          )
      );

    return unsubscribe;
  }, []);

  const [filter, setFilter] = useState([]);
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth.currentUser.email &&transaction.data.type === 'expense'
        )
      );
    }
  }, [transactions]);

 
  
  const [totalIncome, setTotalIncome] = useState([]);

  const [income, setIncome] = useState(0);
  const [totalFood, setTotalFood] = useState([]);

  const [food, setFood] = useState(0);
  const [totalEnterTaiment, setTotalEnterTaiment] = useState([]);
  const [enterTaiment, setEnterTaiment] = useState(0);
  const [totalClothing, setTotalClothing] = useState([]);
  const [clothing, setClothing] = useState(0);
  const [totalEducation, setTotalEducation] = useState([]);
  const [education, setEducation] = useState(0);
  const [totalOthers, setTotalOthers] = useState([]);
  const [others, setOthers] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

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

  useEffect(() => {
    if (totalFood) {
      if (totalFood?.length == 0) {
        setFood(0);
      } else {
        setFood(totalFood?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
    if (totalEnterTaiment) {
      if (totalEnterTaiment?.length == 0) {
        setEnterTaiment(0);
      } else {
        setEnterTaiment(
          totalEnterTaiment?.reduce((a, b) => Number(a) + Number(b), 0)
        );
      }
    }
    if (totalClothing) {
      if (totalClothing?.length == 0) {
        setClothing(0);
      } else {
        setClothing(totalClothing?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
    if (totalEducation) {
      if (totalEducation?.length == 0) {
        setEducation(0);
      } else {
        setEducation(
          totalEducation?.reduce((a, b) => Number(a) + Number(b), 0)
        );
      }
    }
    if (totalOthers) {
      if (totalOthers?.length == 0) {
        setOthers(0);
      } else {
        setOthers(totalOthers?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0);
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0));
      }
    }
  }, [
    totalFood,
    enterTaiment,
    food,
    totalEnterTaiment,
    education,
    totalEducation,
    clothing,
    totalClothing,
    others,
    totalOthers,
    income,
    totalIncome,
  ]);

  // const [totalExpenses, setTotalExpenses] = React.useState([]);
  const [label, setLabel] = useState(true);

  //  const data3 = [
  //    { x: "food", y: food },
  //    { x: "entertaiment", y: enterTaiment },
  //    { x: "clothing", y: clothing },
  //    { x: "education", y: education },
  //    { x: "others", y: others },
  //  ];

  let categoriesData = [
    {
      id: 1,
      name: "food",
      total: food,
      color: "#ff6e12",
    },
    {
      id: 2,
      name: "entertaiment",
      total: enterTaiment,
      color: "#bb0000",
    },
    {
      id: 3,
      name: "clothing",
      total: clothing,
      color: "#da70d6",
    },
    {
      id: 4,
      name: "education",
      total: education,
      color: "#fdc1c5",
    },
    {
      id: 5,
      name: "others",
      total: others,
      color: "#f7e9b5",
    },
    // {
    //   id: 6,
    //   name: "income",
    //   total: income,
    //   color: "#38ff46",
    // },
  ];

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "food",
      total: food,
      color: "#e4d9fd",
    },
    {
      id: 2,
      name: "entertaiment",
      total: enterTaiment,
      color: "#c6affc",
    },
    {
      id: 3,
      name: "clothing",
      total: clothing,
      color: "#a281f0",
    },
    {
      id: 4,
      name: "education",
      total: education,
      color: "#5721d4",
    },
    {
      id: 5,
      name: "others",
      total: others,
      color: "#3e04c3",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = React.useState(null);

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,

          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.lightGray,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.calendar}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightBlue,
              }}
            />
          </View>

          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>{today}</Text>
            <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
              {currentDate}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    let chartData = categoriesData.map((item) => {
      return {
        name: item.name,
        y: item.total,
        // expenseCount: confirmExpenses.length,
        color: item.color,
        id: item.id,
      };
    });

    return chartData;
  }

  function setSelectCategoryByName(name) {
    let category = categories.filter((a) => a.name == name);
    setSelectedCategory(category[0]);
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    let colorScales = chartData.map((item) => item.color);
    let totalExpenseCount = chartData.reduce(
      (a, b) => a + (b.expenseCount || 0),
      0
    );

    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            labelComponent={
              label ? (
                <VictoryTooltip dy={0} centerOffset={{ x: 25 }} />
              ) : undefined
            }
            radius={({ datum }) =>
              selectedCategory && selectedCategory.name == datum.name
                ? SIZES.width * 0.4
                : SIZES.width * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({ innerRadius }) =>
              (SIZES.width * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: { fill: "white" },
              parent: {
                ...styles.shadow,
              },
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale={colorScales}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          setSelectCategoryByName(categoryName);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {totalExpenseCount}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Expenses
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Svg
            width={SIZES.width}
            height={SIZES.width}
            style={{ width: "100%", height: "auto" }}
          >
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              labels={(datum) => console.log("datum")}
              radius={({ datum }) =>
                selectedCategory && selectedCategory.name == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.4 - 10
              }
              innerRadius={70}
              labelRadius={({ innerRadius }) =>
                (SIZES.width * 0.4 + innerRadius) / 2.5
              }
              style={{
                labels: { fill: "white" },
                parent: {
                  ...styles.shadow,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale={colorScales}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            let categoryName = chartData[props.index].name;
                            setSelectCategoryByName(categoryName);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
          <View style={{ position: "absolute", top: "42%", left: "40%" }}>
            <Text style={{ ...FONTS.h1, textAlign: "center" }}>
              {filter.length}
            </Text>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Transactions
            </Text>
          </View>
        </View>
      );
    }
  }

  function renderExpenseSummary() {
    let data = processCategoryDataToDisplay();

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: 40,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor:
            selectedCategory && selectedCategory.name == item.name
              ? item.color
              : COLORS.white,
        }}
        onPress={() => {
          let categoryName = item.name;
          setSelectCategoryByName(categoryName);
        }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : item.color,
              borderRadius: 5,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color:
                selectedCategory && selectedCategory.name == item.name
                  ? COLORS.white
                  : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} VND
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: SIZES.padding }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>
      {/* Nav bar section */}
      {/* {renderNavBar()} */}

      {/* Header section */}
      {renderHeader()}

      {/* Category Header Section */}

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View>
          {renderChart()}
          {renderExpenseSummary()}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChartScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
