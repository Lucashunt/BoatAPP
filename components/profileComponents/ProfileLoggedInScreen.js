import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';
import { logout, getID, updateBoatOwner } from '../../utils/AuthService.js';
const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');





export default function ProfileLoggedInScreen ({onTrigger, navigation}) {

    //funktionen der tager brugeren til update profil skærmen
    const goToUpdateScreen = () => {
        navigation.navigate('UpdateProfile'); 
      };

    //funktionen der logger brugeren ud, ved at bruge hjælpefunktionen fra utils AuthService, samt onTrigger funktionen der er sendt med fra App.js,
    //der gør at brugeren informationen bliver opdateret i App.js i storage
    const loggingOut = async () => {
        await logout()
         onTrigger()
     }
     //her gemmes og opdateres brugeren profiloplysninger 
    const [profile, setProfile] = useState([]);

    //bruges denne funktion overhovdet??
    const [id, setId] = useState('');

    const getUserInformation = async () => {

        //getID() er en funktione fra utls, der henter id fra storage
        const ID = await getID()
        const record = await pb.collection('users').getOne(ID);
       setId(ID)
        setProfile(record)
    }

    //denne funktione bruges til at ændre brugeren til at se bådlejer sider eller bådejer sider, samt opdaterer det i databasen
    const changeBoatOwner = async () => {
        const ID = await getID()
       
        const data = {
            boatOwner: !profile.boatOwner
        }

        await pb.collection('users').update(ID, data)
        updateBoatOwner(data.boatOwner.toString())
        setProfile({...profile, boatOwner: !profile.boatOwner})
        onTrigger()
        
    }

    //data om brugeren hentes ved screen load, kan evt laves om til at hele skærmen bruger loadingstate?
    useEffect(() => {
        getUserInformation()
      }, []);

 

    return(
        <View style={styles.container}>
            <View style={styles.containerTwo}>
            <Text>Hej</Text>
            <Button title='Log ud' onPress={loggingOut}></Button>
            </View>
            <View style={styles.containerTwo}>
                {profile.length === 0 ? <Text>loading...</Text> : 
                <>
               {profile.username ? <Text>{profile.username}</Text> : <Text>Ikke oplyst</Text>}
               {profile.harbor ? <Text>Havn: {profile.harbor}</Text> : <Text>Ikke oplyst</Text>}
               {profile.address ? <Text>Adresse: {profile.address},</Text> : <Text>Ikke oplyst</Text>}
               {profile.postal && profile.city ? <Text>{profile.postal} {profile.city}</Text> : <Text>Ikke oplyst</Text>}
               {profile.phone ? <Text>Mobil: {profile.phone}</Text> : <Text>Ikke oplyst</Text>}
               {profile.email ? <Text>Mail: {profile.email}</Text> : <Text>Ikke oplyst</Text>}
               {profile.boatOwner === true ? <Text>Bådejer</Text> : <Text>Bådlejer</Text>}
               
               <Button title={profile.boatOwner === true ? 'Skift til bådlejer' : 'skift til bådejer'} onPress={changeBoatOwner}></Button>
               </>
               }
              
                <Button title='Rediger profil' onPress={goToUpdateScreen}></Button>
                


            </View>
            
        </View>
    )
    }







const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
 
        backgroundColor: 'white',
    },
    horizontal: {
        flexDirection: 'row',
        paddingTop: 40,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    containerTwo: {
        height: '45%',
        backgroundColor: 'yellow',
        margin: 10,
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