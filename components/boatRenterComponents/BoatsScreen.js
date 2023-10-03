import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import PocketBase from 'pocketbase';
import { useState } from 'react';

//Funktionen tager data fra databasen og printer det i en <Text>
function Boats ({name}) {

    return (
        <>
            <Text>{name}</Text>
        </>
    )
}



function BoatScreen({prop}) {
    const pb = new PocketBase('https://pocketbaselucashunt.fly.dev');

    const [boats, setBoats] = useState([]);

    //Henter både fra pocketbasedatabasen og ændre const boats til det hentede data
    async function getBoats () {
        setBoats([])
        const response = await pb.collection('boatPosts').getFullList(200 /* batch size */, {
            sort: '-created',
        });
            response.map((boat) => {
                console.log(boat.name)
                setBoats(boats => [...boats, boat.name])
            })
            // setBoats([...response.data()]);
      
        console.log(response[0].name)
    }

    return (
        
        <View style={styles.container}>
         {/*  Henter bådtyper når der klikkes på knappen */}
            <Button title="Hent både" onPress={() => getBoats()}/>
            {
                boats.map((boat) => {
                    return <Boats name={boat}/>
                })
            }
        </View>
       
    );
}

export default BoatScreen

//Lokal styling til brug i SettingsScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 20,
    },
});