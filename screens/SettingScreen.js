import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/*<View style={styles.account}>
          <TouchableOpacity>
            <FontAwesome name="arrow-left" size={24} color="#00A86B" />
          </TouchableOpacity>
          <View style={styles.accountName}>
            <Text style={{ fontSize: 20 }}>Setting</Text>
          </View>
        </View>


        <Divider />*/}


        <View>
          <TouchableOpacity style={styles.featureBox}>
            <Text style={styles.featureName}>Currency</Text>
            <View style={{}}>
              <Text style={{ color: '#7777' }}>VND 
              <FontAwesome name="chevron-right" size={14} color="#00A86B" /></Text>
            </View>
          </TouchableOpacity>
          <View style={styles.featureBox}>
            <Text style={styles.featureName}>Theme</Text>
            <Switch />
          </View>
          <View style={styles.featureBox}>
            <Text style={styles.featureName}>Notification</Text>
            <Switch />
          </View>
          <TouchableOpacity style={styles.featureBox}>
            <Text style={styles.featureName}>About</Text>
            <View style={{}}>
              <FontAwesome name="chevron-right" size={14} color="#00A86B" />
            </View>
          </TouchableOpacity>
         
        </View>
      </SafeAreaView>
    </View>
  );
};


export default SettingScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featureBox: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
  },
  featureName: {
    fontSize: 14,
    // fontWeight: 450,
  },
});


