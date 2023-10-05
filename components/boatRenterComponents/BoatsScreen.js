import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import PocketBase from 'pocketbase';
import { useState } from 'react';

//Funktionen tager data fra databasen og printer det i en <Text>
function Boats ({name, onTrigger}) {

    return (
        <>
            <Text>{name}</Text>
            <Button title='Se båd' onPress={onTrigger}></Button>
        </>
    )
}



export default function BoatsScreen({fromSearch, onTrigger}) {
    
    const [boats, setBoats] = useState(fromSearch);



    console.log(boats)
    return (
        
        <View style={styles.container}>
            <View><Text>hello</Text></View>
          
            { boats.length > 0 ?
                boats.map((boat, index) => {
                    return <Boats key={index} name={boat.name} onTrigger={onTrigger}/>
                })
                : <Text>Der er ingen både</Text>
            }
        </View>
       
    );
}

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