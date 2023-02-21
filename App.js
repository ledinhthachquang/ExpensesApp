import 'react-native-gesture-handler'
import {StatusBar} from 'expo-status-bar'
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

// pages
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AddScreen from './screens/AddScreen'
import UpdateScreen from './screens/UpdateScreen'
import AllTransactions from './screens/AllTransactions'

import Profile from './screens/Profile'
import EditProfile from './screens/EditProfile'
import ChartScreen from './screens/ChartScreen'
import ExportScreen from './screens/ExportScreen'
import ImportScreen from './screens/ImportScreen'
import TransactionDetail from './screens/TransactionDetail'
import HelpScreen from './screens/HelpScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import TermScreen from './screens/TermScreen'
import SettingScreen from './screens/SettingScreen'




const Stack = createStackNavigator()
export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#DDD5F1',
      backgroundColor: '#00A86B',
      // backgroundColor: '#51A3B1',#00A86B
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: 'black',
  }
  // function Home() {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="Home" component={Home} />
  //       <Drawer.Screen name="article" component={Article} />
  //     </Drawer.Navigator>
  //   )
  // }
  // function Article() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Article Screen</Text>
  //     </View>
  //   );
  // }
  const ProfileStack = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: 'Edit Profile',
          headerShown:false,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Transaction' component={TransactionDetail} />
        <Stack.Screen name='Add' component={AddScreen} />
        <Stack.Screen name='Update' component={UpdateScreen} />
        <Stack.Screen name='All' component={AllTransactions} />
        <Stack.Screen name='Profile' component={ProfileStack} />
        <Stack.Screen name='EditProfile' component={EditProfile} />
        <Stack.Screen name='Chart' component={ChartScreen} />
        <Stack.Screen name='Export' component={ExportScreen}/>
        <Stack.Screen name='Import' component={ImportScreen}/>
        <Stack.Screen name='Help' component={HelpScreen}/>
        <Stack.Screen name='Privacy' component={PrivacyScreen}/>
        <Stack.Screen name='Terms & Definitions' component={TermScreen}/>
        <Stack.Screen name='Setting' component={SettingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}