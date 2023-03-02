import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { db, auth } from '../firebase'
import { Text, Icon, Button,Input } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'
// import FilterIcon from '../components/FilterIcon's

const AllTransactions = ({ navigation }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setTransactions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
      headerRight: () => (
        <Button
          type="clear"
          icon={<FontAwesome5 name="filter" size={23} color="#fff" />}
          onPress={() => setShowFilter(!showFilter)}
        />
      ),
    })
  }, [navigation, showFilter])

  useEffect(() => {
    setFilter(
      transactions.filter(
        (transaction) =>
          transaction.data.email === auth.currentUser.email &&
          transaction.data.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, transactions])

  return (
    <>
      <View style={styles.searchContainer}>
        <Input
          style={styles.searchInput}
          placeholder="Search"
          leftIcon={<Icon name="search" type="fontawesome" />}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      {showFilter ? (
        <FillterIcon transactions={transactions} setFilter={setFilter} />
      ) : (
        filter?.length > 0 ? (
          <SafeAreaView style={styles.container}>
            <ScrollView>
              {filter?.map((info) => (
                <View key={info.id}>
                  <CustomListItem
                    info={info.data}
                    navigation={navigation}
                    id={info.id}
                  />
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        ) : (
          <View style={styles.containerNull}>
            <FontAwesome5 name='list-alt' size={24} color='#EF8A76' />
            <Text h4 style={{color: '#4A2D5D'}}>
              No Transactions
            </Text>
          </View>
        )
      )}
    </>
  )
}

export default AllTransactions


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    marginTop: -23,
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});


