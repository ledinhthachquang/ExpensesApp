import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Pressable} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
// import RNPickerSelect from 'react-native-picker-select';

const FilterScreen = ({ visible, setVisible, navigation }) => {
  const [selectedType, setselectedType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setselectedType(category);
  };

  const handleSortBySelect = (sortOption) => {
    setSortBy(sortOption);
  };

  const resetFilters = () => {
    setselectedType('');
    setSortBy('');
  };
  // const expenseCategories = [
  //   { label: "🎓 Education", value: "education", icon: "md-school" },
  //   { label: "🎮 Entertainment", value: "entertainment", icon: "md-game-controller-b" },
  //   { label: "👗 Clothes", value: "clothing", icon: "md-shirt" },
  //   { label: "🍜 Food", value: "food", icon: "md-restaurant" },
  //   { label: "📦 Other", value: "other", icon: "md-options" }
  // ];
  
  // const incomeCategories = [
  //   { label: "💰 Salary", value: "salary", icon: "md-cash" },
  //   { label: "🏦 Investment", value: "investment", icon: "md-trending-up" },
  //   { label: "💵 Gift", value: "gift", icon: "md-gift" },
  //   { label: "🪙 Bonus", value: "bonus", icon: "md-gift" },
  //   { label: "📦 Other", value: "other", icon: "md-options" }
  // ];
  // Define the filter conditions
const timestampFilter = "highest"; // Options: "highest", "lowest", "newest", "oldest"
const typeFilter = "expense"; // Options: "income", "expense"
const categoryFilter = "food"; // Options: "education", "entertainment", "clothing", "food", "other", "salary", "investment", "gift", "bonus"

// Filter the data
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
db.collection("expense")
  .where("type", "==", typeFilter)
  .where("category", "==", categoryFilter)
  .orderBy("timestamp", timestampFilter == "highest" ? "desc" : "asc")
  .limit(1)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log("No transaction found matching the filtered condition.");
    } else {
      // Process the filtered data
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Pressable onPress={() => setVisible(false)}>
              <FontAwesome5 name='times-circle' size={24} color='black' />
            </Pressable>
            <Text style={styles.filterTitle}>Filter Transaction</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.filterReset}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Filter By</Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedType === 'Income' && styles.buttonSelected,
                ]}
                onPress={() => handleCategorySelect('Income')}
              >
                <Text style={styles.buttonText}>Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedType === 'Expense' && styles.buttonSelected,
                ]}
                onPress={() => handleCategorySelect('Expense')}
              >
                <Text style={styles.buttonText}>Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Sort By</Text>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  sortBy === 'highest' && styles.buttonSelected,
                ]}
                onPress={() => handleSortBySelect('highest')}
              >
                <Text style={styles.buttonText}>Highest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  sortBy === 'lowest' && styles.buttonSelected,
                ]}
                onPress={() => handleSortBySelect('lowest')}
              >
                <Text style={styles.buttonText}>Lowest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  sortBy === 'newest' && styles.buttonSelected,
                ]}
                onPress={() => handleSortBySelect('newest')}
              >
                <Text style={styles.buttonText}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  sortBy === 'oldest' && styles.buttonSelected,
                ]}
                onPress={() => handleSortBySelect('oldest')}
              >
                <Text style={styles.buttonText}>Oldest</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.picker1}>
            {selectedType === 'Expense' ? (
              <Picker
                style={styles.picker}
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Choose Category" value={null} />
                {expenseCategories.map((category) => (
                  <Picker.Item
                    key={category.value}
                    label={category.label}
                    value={category.value}
                  />
                ))}
              </Picker>
            ) : (
              <Picker
                style={styles.picker}
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Choose Category" value={null} />
                {incomeCategories.map((category) => (
                  <Picker.Item
                    key={category.value}
                    label={category.label}
                    value={category.value}
                  />
                ))}
              </Picker>
            )}
            </View>
           
        </View>
          <TouchableOpacity
            style={styles.applyButton}
            activeOpacity={0.5}
            
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      filterContainer: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        maxHeight: '55%',
      },
      filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
      },
    filterTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    filterReset: {
      color: '#7F3DFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    filterSection: {
      padding: 15,
      borderBottomColor: '#E1E8EE',
      borderBottomWidth: 1,
    //   marginTop: 20
    },
    filterSectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E1E8EE',
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    buttonText: {
      color: '#333',
      fontWeight: 'bold',
    },
    buttonSelected: {
      borderColor: '#7F3DFF',
      backgroundColor: '#F8F9FB',
    },
    selectBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E1E8EE',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    selectBoxText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: '#7F3DFF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 18,
      },
      applyButtonText: {
        fontSize: 16,
        color: '#fff',
      },
      picker1: {
        // flexDirection: 'row',
        // alignItems: 'center',
        height: 65,
        borderWidth: 1,
        borderColor: '#E1E8EE',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        // marginBottom: 10,
        paddingHorizontal: 10,
      },
  });
export default FilterScreen