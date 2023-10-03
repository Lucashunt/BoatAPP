import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import PocketBase from 'pocketbase';
import { storeToken } from '../../utils/AuthService.js';
import { useNavigation } from '@react-navigation/native';



export default function ProfileCreateLoginScreen({onTrigger }) {
  const navigation = useNavigation();

  const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false);

  const goToLoginScreen = () => {
    navigation.navigate('Login'); 
  };

  async function createUser() {
    setLoadingState(true);
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
    };
    
    try {
      await pb.collection('users').create(data);
    

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
      <Text style={styles.text}>Opret profil</Text>
      <TextInput
        placeholder="Navn"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
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
      <Button title="Opret profil" onPress={createUser} />
      <Button title="Log ind" onPress={goToLoginScreen} />
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