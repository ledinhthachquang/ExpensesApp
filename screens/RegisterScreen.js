import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {TextInput,StyleSheet, View, KeyboardAvoidingView, Pressable } from 'react-native'
import {Input, Button, Text, Image} from 'react-native-elements'
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const signUp = () => {
    if (fullName && email && password) {
      setSubmitLoading(true)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
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
      <Image
        source={{
          uri:
            'https://static-s.aa-cdn.net/img/gp/20600011886807/to-aGJ31KLwqc9AWaBUyL6NLbpFwN9VEliX7nQ_AU48aO4jH6M1MltWKmThWJPndJg=s300?v=1',
        }}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text h4 style={{marginBottom: 50}}>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
        {/* <Input
          placeholder='Full Name'
          type='text'
          autoFocus
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        /> */}
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
        {/* <Input
          placeholder='Email'
          type='text'
          
          value={email}
          onChangeText={(text) => setEmail(text)}
        /> */}
         <TextInput
          style={styles.box}
          placeholder='Password'
          name='text'
          autoFocus
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {/* <Input
          placeholder='Password'
          type='text'
          
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        /> */}
         <TextInput
          style={styles.box}
          placeholder='Profile Picture Url (Optional)'
          name='text'
          autoFocus
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={signUp}
        />
        {/* <Input
          placeholder='Profile Picture Url (Optional)'
          type='text'
         
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={signUp}
        /> */}
      </View>
      {/* <Button
        containerStyle={styles.button}
        title='Register'
        onPress={signUp}
        loading={submitLoading}
      /> */}
      <Pressable style={styles.buttonRegister} onPress={signUp} loading={submitLoading}>
            <Text style={styles.text} >Register</Text>
          </Pressable>
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
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
    backgroundColor:'white'
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
