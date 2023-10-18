import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import PocketBase from 'pocketbase';
import { storeToken } from '../../utils/AuthService.js';


//Denne skærm er til at brugeren kan logge ind hvis han allerede har en konto

export default function ProfileLoginScreen({onTrigger}) {
  
  const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false);


  async function loginUser() {
    //Starter med at sætter loadingstate til true så brugeren ved at der bliver arbejdet på at logge ind
    setLoadingState(true);

    //Logger kunden ind med email og password
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
      //kan i fremtiden laves så brugeren får besked om at der er sket en fejl
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

      //Tenary operator der viser en loading bar hvis loadingstate er true
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