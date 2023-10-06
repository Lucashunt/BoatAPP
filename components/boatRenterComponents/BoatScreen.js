import React, { useEffect, useState } from "react";
import {SafeAreaView, StyleSheet, Text, View, Button} from "react-native";
import LoadingScreen from "../LoadingScreen";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://pocketbaselucashunt.fly.dev");

export default function BoatScreen({ route, navigation }) {
    const [boat, setBoat] = useState({});
    const { id } = route.params;

    async function getBoat() {
        const boat = await pb.collection("boatPosts").getOne(id);
        setBoat(boat);
    }

    useEffect( () => {
        //make a timeout function

            getBoat();


       
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {  Object.keys(boat).length === 0 ? <LoadingScreen /> : 
            <>
            
            <Text>{boat.name}</Text> 
            <Text>{boat.price}</Text>
            <Text>{boat.harbour}</Text>
            <Text>{boat.typeOfBoat}</Text>
            <Text>{boat.dateStart}</Text>
            <Text>{boat.dateEnd}</Text>
            <Text>{boat.description}</Text>
            <Text>Ejer: {boat.owner}</Text>
            </>
            }
           
        </SafeAreaView>
    )
}

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