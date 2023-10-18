import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


//Denne komponent bruges hver gang der sker en fejl, så vises denne screen.
export default function ErrorScreen ({errorMessage}) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.ErrorText}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
    },
    ErrorText: { 
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    }
});
