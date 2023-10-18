import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import PocketBase from 'pocketbase';
import { useState } from 'react';
import Starred from './specialComponents/Starred.js';

//Denne skærm viser en masse boatposts fra databasen


//Denne funktion tager hver enkelt boat og laver et "card"
function Boats ({id, name, onTrigger}) {

    return (
        <>
            <Text>{name}</Text>
            <Button title='Se båd' onPress={()=> onTrigger({ id })}></Button>
            <Starred id={id}/>
        </>
    )
}



//Her tages informationerne om alle både og laves om til en liste af de enkelte "cards" vha. Boats funktioenen 
export default function BoatsScreen({fromSearch, onTrigger, onPress}) {
    
    //Burde den laves om til almindelig const?
    const [boats, setBoats] = useState(fromSearch);

    
    return (
        
        <View style={styles.container}>
            <Button title="Ændre søgning" onPress={onPress}/>
            {/* Tager alle bådepostne returnet fra databasen og map hver enkelt */}
            { boats.length > 0 ?
                boats.map((boat, index) => {
                    return <Boats key={index} name={boat.name} id={boat.id} onTrigger={onTrigger}/>
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