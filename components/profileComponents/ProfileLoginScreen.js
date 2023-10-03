import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import PocketBase from 'pocketbase';
import { storeToken } from '../../utils/AuthService.js';
import { useNavigation } from '@react-navigation/native';



export default function ProfileLoginScreen({onTrigger}) {
  const navigation = useNavigation();
  
  const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false);


  async function loginUser() {
    setLoadingState(true);

    
    try {
      const authData = await pb.collection('users').authWithPassword(
        email,
        password
      );

      if (authData) {
        storeToken({userToken: pb.authStore.token, userID: pb.authStore.model.id, boatOwner: pb.authStore.model.boatOwner.toString()});
        onTrigger(); 
        setLoadingState(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoadingState(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log Ind</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Adgangskode"
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        secureTextEntry={true}
      />
      <Button title="Log ind" onPress={loginUser} />
      {loadingState ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      

    </View>
  );
}



const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
    paddingBottom: 40,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
  },
};

  // const navigateToProfile = () => {
   
  //   navigation.dispatch(
  //     CommonActions.navigate({
  //       name: 'Profile', // Name of the targeted screen
  //     })
  //   );
  // };

  // Function to create a user in the Pocketbase database