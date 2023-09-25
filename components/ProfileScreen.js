import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import * as React from "react";
import { useState } from "react";
import PocketBase from "pocketbase";



function ProfileScreen({prop}) {
    const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


//Funktionen createUser() opretter en bruger i Pocketbase databasen med de indtastede oplysninger
    async function createUser() {
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": password
        };
        const record = await pb.collection('users').create(data);
        console.log(record);
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Opret profil</Text>
            <TextInput placeholder="Navn"
             onChangeText={setUsername}
             value={username}
             style={styles.input}
             
            
            />
            <TextInput placeholder="Email"
               onChangeText={setEmail}
               value={email}
               style={styles.input}/>
                
            <TextInput placeholder="Adgangskode"
            style={styles.input}
               onChangeText={setPassword}
               value={password}/>
            <Button title="Opret profil" onPress={() => createUser()}/>
            {/* Når knappen bliver trykket på oprettes en profil i databasen */}
        </View>
    );
}

export default ProfileScreen

//Lokal styling til brug i HomeScreen
const styles = StyleSheet.create({
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
        padding: 10,}
});