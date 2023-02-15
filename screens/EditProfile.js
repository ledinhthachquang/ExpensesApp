
import React, { useState,useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {auth,db} from '../firebase'
import {  Avatar, ListItem } from "react-native-elements";



export default function EditProfileScreen({navigation}) {
//   const { name, accountName, profileImage } = route.params;
  const ToastMessenger = () => {
    ToastAndroid.show("Edit Successfully", ToastAndroid.SHORT);
  };
  const [image, setImage] = useState(null);

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUrl(result.assets[0].uri)
    }
  };
  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection('users')
  //     .doc(itemId)
  //     .onSnapshot(
  //       (snapshot) =>
  //         setFullName(snapshot.data()?.displayName) &
  //         setEmail(snapshot.data()?.email) &
  //         setImageUrl(snapshot.data()?.photoURL)
  //     )
  //   return unsubscribe
  // }, [])
  // const updateProfile = () => {
  //   if (fullName && email && imageUrl ) {
  //     setSubmitLoading(true)
  //     db.collection('users')
  //       .doc(itemId)
  //       .update({
  //         displayName:fullName,
  //         email:email,
  //         photoURL:imageUrl,
  //       })
  //       .then(() => clearInputFields())
  //       .catch((error) => alert(error.message))
  //   } else {
  //     setSubmitLoading(false)
  //     alert('All fields are mandatory')
  //   }
  // }
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.top}>
        
        {/* <Text style={{fontsize: 16, fontWeight: 'bold'}}>Edit Profile</Text>
        <TouchableOpacity onPress={() => {
          ToastMessenger();
          navigation.goBack()}}>
          <MaterialIcons name="done" size={24} color="green" />
        </TouchableOpacity> */}
        <View style={{ padding: 20, alignItems: "center" }}>
          {/* <Image
            source="https://res.cloudinary.com/dc5xcbmvp/image/upload/v1675657593/upload/logo_ifv5gc.png?fbclid=IwAR03Q7fp1hFXBZylM5txwliy4mY0l54ibrN9LlBWGZzjJ6drW04KT7ZeKjU"
            style={{ width: 80, height: 80, borderRadius: 50 }}
          /> */}
          <View style={{ paddingTop: 10 }}>
          <Avatar
              style= {{ height:200, width:200, paddingTop:20}}
              size="medium"
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
            <Text onPress={pickImage} style={{ color: "#00A86B" }}>
              Change profile photo
            </Text>
            {/* {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
             <Ionicons name="person" size={24} color="black" />
            </Text>
            <TextInput
              placeholder= {user.displayName}
            //   defaultValue={name}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
                paddingTop: 5,
              }}
            />
          </View>

          <View style={{ padding: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
             <Ionicons name="mail-open-outline" size={24} color="black" />
            </Text>
            <TextInput
              placeholder={user.email}
            //   defaultValue={accountName}
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
                paddingTop: 5,
              }}
            />
          </View>

          <View style={{ padding: 10 }}>
            <Text
              style={{
                opacity: 0.5,
              }}
            >
              <Feather name="phone-forwarded" size={24} color="black" />
            </Text>
            <TextInput
              placeholder="phonenumber"
              style={{
                fontSize: 16,
                borderBottomWidth: 1,
                borderColor: "#CDCDCD",
                paddingTop: 5,
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end", paddingTop: 20 }}>
          <Button
            title="Done"
            onPress={() => {
              {/** ToastMessenger(); */}
              navigation.goBack();
            }}
            color="#00A86B"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="cancel" size={24} color="black" />
        <Text>Cancel Edit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  // top: {
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 10,
  // }
});