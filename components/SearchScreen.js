import {SafeAreaView, StyleSheet, Text, View, Button} from "react-native";
import * as React from "react";

//SettingsScreen komponenten tager en prop med og printer indholdet af denne prop i en <Text>
function SearchScreen({prop}) {
    return (
     
        <View style={styles.container}>
            <Text style={styles.text}>Søg efter både...</Text>
            <Button title='Klik på mig'></Button>
        </View>
  
    );
}

export default SearchScreen

//Lokal styling til brug i SettingsScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 40,
        paddingBottom: 40,
    },
});