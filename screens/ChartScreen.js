import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';
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
    Platform
} from 'react-native';
import { useState } from 'react';
import { auth, db } from "../firebase";


function expenseData() {
    useEffect(() => {
        const getData = db
            .collection('expense')
            .get()
            .then(querySnapshot => {
                console.log('Total expense: ', querySnapshot.size);
                setTotalExpenses(querySnapshot.size)

                querySnapshot.forEach(documentSnapshot => {
                    console.log('Expense ID: ', documentSnapshot.id, documentSnapshot.data());
                });
            });
    })
}

const ChartScreen = () => {
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
                    )
            );

        return unsubscribe;
    }, []);
    useEffect(() => {
        if (totalFood) {
            if (totalFood?.length == 0) {
                setFood(0);
            } else {
                setFood(totalFood?.reduce((a, b) => Number(a) + Number(b), 0));
            }
        }

    }, [totalFood]);
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
    const [totalExpenses, setTotalExpenses] = React.useState([])
    const [food, setFood] = React.useState(0)
    const [totalFood, setTotalFood] = React.useState([])
    const [label, setLabel] = useState(false);
    const [data3, setData3] = [
        { x: "food", y: food },
        { x: "entertaiment", y: 151000 },
        { x: "clothing", y: 160000 },
        { x: "education", y: 141923 },
        { x: "others", y: 156767 }
    ];
    
    return (
        <View style={{ alignItems: 'center' }}>
            <Text>ChartScreen</Text>
            <VictoryPie
                animate={{ duration: 2000 }}
                width="800"
                tooltip={"dshv"}
                labelComponent={
                    label ? <VictoryTooltip dy={0} centerOffset={{ x: 25 }} /> : undefined
                }
                colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
                data={data3}
            />
        </View>
    )
}

export default ChartScreen

