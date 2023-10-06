import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import LoadingScreen from "../LoadingScreen";
import BoatsScreen from "./BoatsScreen";


import PocketBase from "pocketbase";
const pb = new PocketBase("https://pocketbaselucashunt.fly.dev");

export default function SearchScreen({ navigation}) {

    function navigateToBoat({id}) {
       console.log(id)
        navigation.navigate('BoatScreen', { id: id })
        
    }

    const [searching, setSearching] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [errorSearching, setErrorSearching] = useState(false);

  const [harbour, setHarbour] = useState("gilleleje");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [typeOfBoat, setTypeOfBoat] = useState("sailboat");
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateStart(currentDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateEnd(currentDate);
  };

  async function search() {
    setSearching(true);
    const filter = `typeOfBoat = '${typeOfBoat}' && harbour = '${harbour}' && price >= ${minPrice} && price <= ${maxPrice}`;

    try {
      const resultList = await pb.collection("boatPosts").getList(1, 10, {
        sort: "-created",
        filter: filter,
      });

      const filteredPosts = resultList.items.filter((post) => {
        const resultDateStart = new Date(post.dateStart);
        const resultDateEnd = new Date(post.dateEnd);

        return dateStart >= resultDateStart && dateEnd <= resultDateEnd;
      });
      setSearchResult(filteredPosts);
      if (filteredPosts.length === 0) {
        setErrorSearching("Der er ingen både der matcher din søgning!");
        }
      setSearching(false);
    } catch (error) {
      console.error("Error:", error);
      setSearching(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
{ searching === true ? (
    <LoadingScreen />
) : searching === false && searchResult.length === 0 ?(
<>
      <View style={{ width: 200, flex: 1 }}>
        <Text>{minPrice}</Text>
        <Slider
          style={{ width: 200 }}
          value={minPrice}
          onValueChange={setMinPrice}
          maximumValue={1000}
          minimumValue={0}
          step={1}
        />
        <Text>{maxPrice}</Text>
        <Slider
          style={{ width: 200 }}
          value={maxPrice}
          onValueChange={setMaxPrice}
          maximumValue={1000}
          minimumValue={0}
          step={1}
        />
      </View>

      <Picker
        style={{ height: 50, width: 200, flex: 1 }}
        selectedValue={harbour}
        onValueChange={(itemValue, itemIndex) => setHarbour(itemValue)}
      >
        <Picker.Item label="Gilleleje Havn" value="Gilleleje" />
        <Picker.Item label="Hornbæk Havn" value="Hornbak" />
        <Picker.Item label="Skagen Havn" value="Skagen" />
      </Picker>

      <Picker
        style={{ height: 50, width: 200, flex: 1 }}
        selectedValue={typeOfBoat}
        onValueChange={(itemValue, itemIndex) => setTypeOfBoat(itemValue)}
      >
        <Picker.Item label="Motorbåd" value="motorboat" />
        <Picker.Item label="Sejlbåd" value="sailboat" />
        <Picker.Item label="RIB" value="rib" />
        <Picker.Item label="Kajak" value="kayak" />
      </Picker>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <DateTimePicker
          value={dateStart}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeStart}
        />
        <DateTimePicker
          value={dateEnd}
          mode={"date"}
          is24Hour={true}
          onChange={onChangeEnd}
        />
      </View>

      <Button title="Søg" onPress={search} />
      <Text style={{color: 'red'}}>{errorSearching === '' ? '' : errorSearching }</Text>
      </>)

      : (
    
        <BoatsScreen fromSearch={searchResult} onTrigger={navigateToBoat}/>


      ) 
      
      
      
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    alignItems: "center",
  },
});
