import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Privacy is a top priority for our expense manager app. We understand
        that managing your finances can be a sensitive matter, which is why we
        have implemented strict security measures to protect your personal and
        financial information. All data transmitted between our app and our
        servers is encrypted using industry-standard protocols. We also store
        your data on secure servers that are monitored 24/7 to prevent
        unauthorized access. We never sell or share your data with third parties
        for marketing or other purposes. Your information is only used to
        provide you with the best possible user experience and to help you
        manage your expenses more effectively. In addition, we provide you with
        the ability to control your privacy settings within the app. You can
        choose to keep certain information private or share it with specific
        individuals or groups. We are committed to protecting your privacy and
        will continue to invest in the latest security and privacy technologies
        to ensure that your data is safe and secure.
      </Text>
    </View>
  )
}

export default PrivacyScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      fontSize: 14,
      backgroundColor: '#fff'
    }
  });
  