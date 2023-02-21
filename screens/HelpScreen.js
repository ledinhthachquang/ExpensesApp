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
const HelpScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Privacy")}
        >
            <Text style={styles.featureName}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Terms & Definitions")}
        >
            <Text style={styles.featureName}>Terms & Definitions</Text>
        </TouchableOpacity>
          
          <Text style={styles.featureName}>Require to be supported</Text>
        </View>



      
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      fontSize: 14,
      backgroundColor: '#fff'
    },
    featureName: {
        flexDirection:'row',
        justifyContent: 'space-between',
        margin: 16,
        fontWeight: 'lightweight',
    }
    // featureName: {
    //   fontSize: 14,
    // //   fontWeight: '450',
    // },
  });
  
  
  