import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { ListItem, Text, Divider } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import ModalActions from './ModalActions'
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const CustomListItem = ({ info, navigation, id }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View>
        <ListItem onPress={() => setModalVisible(true)}>
          {info.category === 'food' ? (
            <View style={styles.left}>
              {/* <MaterialIcons name='money-off' size={24} color='white' /> */}
              <Image
                source={require("../assets/icons/food_icon.png")}
                style={{ width: 25, height: 25, tintColor: COLORS.gray }}
              />
            </View>
          ) : info.category === 'education' ? (
            <View style={styles.left}>
              {/* <MaterialIcons name='money-off' size={24} color='white' /> */}
              <Image
                source={require("../assets/icons/education_icon.png")}
                style={{ width: 25, height: 25, tintColor: COLORS.yellow }}
              />
            </View>
          ) : info.category === 'clothing' ? (
            <View style={styles.left}>
              {/* <MaterialIcons name='money-off' size={24} color='white' /> */}
              <Image
                source={require("../assets/icons/cloth_icon.png")}
                style={{ width: 25, height: 25, tintColor: COLORS.red }}
              />
            </View>
          ) : info.category === 'entertaiment' ? (
            <View style={styles.left}>
              {/* <MaterialIcons name='money-off' size={24} color='white' /> */}
              <Image
                source={require("../assets/icons/healthcare_icon.png")}
                style={{ width: 25, height: 25, tintColor: COLORS.blue }}
              />
            </View>
          ) : (
            <View style={styles.left}>
              {/* <MaterialIcons name='money-off' size={24} color='white' /> */}
              <Image
                source={require("../assets/icons/sports_icon.png")}
                style={{ width: 25, height: 25, tintColor: COLORS.yellow }}
              />
            </View>
          )}

          <ListItem.Content>
            <ListItem.Title
              style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 18 }}
            >
              {info?.text}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontSize: 16 }}
            >
              {/* {new Date(info?.timestamp?.toDate()).toUTCString()} */}
              {info?.userDate}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            {info.type === 'expense' ? (
              <Text style={styles.right}>
                $ -{Number(info?.price)}
              </Text>
            ) : (
              <Text style={styles.rightIncome}>
                $ {Number(info?.price)}
              </Text>
            )}
          </View>
        </ListItem>
        <Divider style={{ backgroundColor: 'lightgrey' }} />
      </View>
      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
      />
    </>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#533461',
    // backgroundColor: '#fff',
    // backgroundColor: '#61ACB8',

    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#61ACB8',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 16
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16
  },
})
