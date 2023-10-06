import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import PocketBase from 'pocketbase';
import { useState } from 'react';

//Funktionen tager data fra databasen og printer det i en <Text>
function Boats ({id, name, onTrigger}) {

    return (
        <>
            <Text>{name}</Text>
            <Button title='Se båd' onPress={()=> onTrigger({ id })}></Button>
        </>
    )
}



export default function BoatsScreen({fromSearch, onTrigger}) {
    
    const [boats, setBoats] = useState(fromSearch);



    
    return (
        
        <View style={styles.container}>
          
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