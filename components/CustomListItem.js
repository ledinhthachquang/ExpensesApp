import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Text, Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ModalActions from './ModalActions';

const CustomListItem = ({ info, navigation, id }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View>
        <ListItem onPress={() => setModalVisible(true)}>
          <View style={info.type === 'expense' ? styles.left : styles.income}>
          <FontAwesome5

  name={
    info.category === 'education' ? 'book' :
    info.category === 'entertainment' ? 'gamepad' :
    info.category === 'clothing' ? 'tshirt' :
    info.category === 'food' ? 'utensils' :
    info.category === 'other' ? 'ellipsis-h' :
    info.category === 'salary' ? 'money-bill-alt' :
    info.category === 'investment' ? 'chart-line' :
    info.category === 'gift' ? 'gift' :
    info.category === 'bonus' ? 'coins' :
    info.category === 'other'  ? 'ellipsis-h' : ''
  }
  size={
    info.category === 'food' ? 27 :
    info.category === 'education' ? 27 :
    info.category === 'entertainment' ? 20 :
    info.category === 'clothing' ? 19 :
    info.category === 'salary' ? 20 :
    info.category === 'investment' ? 25 :
    info.category === 'gift' ? 25.5 :
    info.category === 'bonus' ? 25 :
    info.category === 'other' ? 25 : 28
  }
  color='white'
/>

          </View>
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: 18,
              }}
            >
              {info?.text}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 16 }}>
              {info?.userDate}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            {info.type === 'expense' ? (
              <Text style={styles.right}>
                 -{Number(info?.price)}đ
              </Text>
            ) : (
              <Text style={styles.rightIncome}>
                 {Number(info?.price)}đ
              </Text>
            )}
          </View>
        </ListItem>
        <Divider style={{ backgroundColor: 'white' }} />
      </View>
      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
      />
    </>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#FD3C4A',
    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#00A86B',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 16,
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16,
  },
});
