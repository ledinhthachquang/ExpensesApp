import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItem from '../components/CustomListItem'
import { db, auth } from '../firebase'
import { Text, Icon, Button, Input } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons'
import FilterScreen from '../components/FilterScreen'

const AllTransactions = ({ navigation }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

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
      );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
      headerRight: () => (
        <>
          {!filterApplied && (
            <Button
              type="clear"
              icon={<FontAwesome5 name="filter" size={23} color="#fff" />}
              onPress={() => setShowFilter(!showFilter)}
            />
          )}
          {filterApplied && (
            <Button
              type="clear"
              title="Remove Filter"
              onPress={() => {
                setFilterApplied(false);
                setSearchQuery('');
              }}
            />
          )}
        </>
      ),
    });
  }, [navigation, showFilter, filterApplied]);

  useEffect(() => {
    setFilter(
      transactions.filter(
        (transaction) =>
          transaction.data.email === auth.currentUser.email &&
          transaction.data.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, transactions]);


  const applyFilter = () => {
    setFilterApplied(true);
    setFilterVisible(false);
  };

  return (
    <>
    <View style = {styles.Container}>
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
        <FilterScreen visible={showFilter} setVisible={setShowFilter}  />
      ) : filter?.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {filter?.map((info) => (
              <View key={info.id}>
                <CustomListItem info={info.data} navigation={navigation} id={info.id} />
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={styles.containerNull}>
          <FontAwesome5 name="list-alt" size={24} color="#EF8A76" />
          <Text h4 style={{ color: '#4A2D5D' }}>
            No Transactions
          </Text>
        </View>
      )}
    </View>
    </>
  );
};

export default AllTransactions;




const styles = StyleSheet.create({

  Container:{
    backgroundColor:'red'
  },
  container: {
    backgroundColor: 'white',
    padding: 0,
    marginTop: -23,
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white', // update this line
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    backgroundColor:'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

