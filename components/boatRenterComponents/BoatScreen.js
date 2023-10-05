import React, { useEffect } from "react";
import {SafeAreaView, StyleSheet, Text, View, Button} from "react-native";


export default function BoatScreen({ route, navigation }) {
  
    const { data } = route.params;



    return (
        <SafeAreaView>
            <Text>{data}</Text>
        </SafeAreaView>
    )
}