import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PocketBase from "pocketbase";
import { getID } from '../../../utils/AuthService';

const pb = new PocketBase("https://pocketbaselucashunt.fly.dev");

//Funktion der skal gemme de posts som brugeren stjernemarkere til databasen
const Starred = ({id}) => {
    const [isFilled, setIsFilled] = useState(false);

    const handleStarPress = async ({id}) => {
        const test = "2nsg9ebobbscnm3"
        const starredId = await pb.collection("starred").getFirstListItem(`boatPost="${test}"`);
        console.log(starredId)
        setIsFilled(!isFilled);
        const user = await getID();

        const data = {
            "userId": user,
            "boatPost": id,
            "starred": isFilled
        };

       try {
            await pb.collection("starred").create(data);
  
       } catch (error) {
              console.log("starred", error)
         }
    };

    return (
        <View>
            <TouchableOpacity onPress={()=> handleStarPress({id})}>
                <Ionicons name={isFilled ? 'star' : 'star-outline'} size={32} color="gold" />
            </TouchableOpacity>
        </View>
    );
};

export default Starred;
