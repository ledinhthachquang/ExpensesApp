import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

const FilterIcon = ({ handleFilter }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [expenseOrIncome, setExpenseOrIncome] = useState(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const applyFilter = () => {
    handleFilter(category, sortBy, expenseOrIncome);
    toggleModal();
  };
  const expenseCategories = [
    { label: "🎓 Education", value: "education" },
    { label: "🎮 Entertainment", value: "entertainment" },
    { label: "👗 Clothes", value: "clothing" },
    { label: "🍜 Food", value: "food" },
    { label: "📦 Other", value: "other" }
  ];
  
  const incomeCategories = [
    { label: "💰 Salary", value: "salary", icon: "md-cash" },
    { label: "🏦 Investment", value: "investment", icon: "md-trending-up" },
    { label: "💵 Gift", value: "gift", icon: "md-gift" },
    { label: "🪙 Bonus", value: "bonus", icon: "md-gift" },
    { label: "📦 Other", value: "other", icon: "md-options" }
  ];

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <FontAwesome name="filter" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter By</Text>
            <View style={styles.selectorContainer}>
              <RNPickerSelect
                placeholder={{
                  label: 'Expense or Income',
                  value: null,
                }}
                onValueChange={(value) => setExpenseOrIncome(value)}
                items={[
                  { label: 'Expense', value: 'expense' },
                  { label: 'Income', value: 'income' },
                ]}
              />
              <RNPickerSelect
                placeholder={{
                  label: 'Sort By',
                  value: null,
                }}
                onValueChange={(value) => setSortBy(value)}
                items={[
                  { label: 'Highest', value: 'highest' },
                  { label: 'Lowest', value: 'lowest' },
                  { label: 'Newest', value: 'newest' },
                  { label: 'Oldest', value: 'oldest' },
                ]}
              />
            </View>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Category</Text>
              <RNPickerSelect
                placeholder={{
                  label: 'Choose Category',
                  value: null,
                }}
                onValueChange={(value) => setCategory(value)}
                items={
                  expenseOrIncome === 'income'
                    ? incomeCategories
                    : expenseCategories
                }
              />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    },
    categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    },
    categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    },
    categorySelect: {
    width: '50%',
    },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: 120,
    alignItems: 'center',
    },
    buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    width: 120,
    alignItems: 'center',
    },
    textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    closeIcon: {
    width: '100%',
    alignItems: 'flex-end',
    },
    icon: {
    marginLeft: 10,
    },
    });
export default FilterIcon;