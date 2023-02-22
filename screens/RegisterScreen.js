import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { TextInput, StyleSheet, View, KeyboardAvoidingView, Pressable } from 'react-native'
import { Input, Button, Text, Image } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from '../firebase'
// import { GoogleSignin } from '@react-native-community/google-signin';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


// import { GoogleSignin } from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  );
}

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const [image, setImage] = useState(null);

  // GoogleSignin.configure({
  //   webClientId: '',
  // });



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // setImageUrl(result.assets[0].uri)
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      setImageUrl(result.assets[0].uri)


    }

  }



  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const signUp = () => {
    if (fullName && email && password ) {
      setSubmitLoading(true)

      auth
        .createUserWithEmailAndPassword(email, password)

        .then((authUser) => {
          db.collection('users')
            .add({
              email: email,
              photoURL: imageUrl,
              displayName: fullName,
            })
          clearInputFields() &
            authUser.user.updateProfile({
              displayName: fullName,
              photoURL:
                imageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
            })
        })


        .catch((err) => alert(err.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Created Account')
    navigation.replace('Home')
    setSubmitLoading(false)
    setFullName('')
    setEmail('')
    setPassword('')
    setImageUrl('')
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      
       <Image source={require('./../assets/logo.png')} style={{width: 200, height: 200, marginBottom: 20}} />
      <Text h4 style={{ marginBottom: 50 }}>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
       
        <TextInput
          style={styles.box}
          placeholder='Full Name'
          name='text'
          autoFocus
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.box}
          placeholder='Email'
          name='text'
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
       
        <TextInput
          style={styles.box}
          placeholder='Password'
          name='text'
          autoFocus
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
       
        <Pressable style={styles.buttonRegister} onPress={pickImage} >
          <Text style={styles.text} >Choose image for profile </Text>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Pressable>



      </View>
     
      <Pressable style={styles.buttonRegister} onPress={signUp} loading={submitLoading}>
        <Text style={styles.text} >Sign up</Text>
      </Pressable>
      {/* <Text style={{marginTop: 8, fontSize: 12, letterSpacing: 0.25, color: 'gray', fontWeight: 'bold'}}>Or with</Text> */}
      {/* <Pressable style={styles.buttonRegister} onPress={signUp} loading={submitLoading}>
        <Text style={styles.text} >
          Sign up with Google
          </Text>
      </Pressable> */}
      {/* {GoogleSignIn} */}
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
        titleStyle={{ color: 'gray' }}
        type='clear'
        style={styles.button}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFF6E5',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
    backgroundColor: 'white'
  },
  buttonRegister: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#00A68B",
    width: 300,
    marginTop: 8,
    marginTop:10,

  },
  box: {
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
})
