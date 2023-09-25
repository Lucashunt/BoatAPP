import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./components/ProfileScreen";
import BoatScreen from "./components/BoatScreen";
import SearchScreen from "./components/SearchScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Her oprettes en instans af tabnavigator.
const Tab = createBottomTabNavigator();




function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
        {
          display: "flex"
        },
          null
          ],
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Bådde') {
            }
            else{
              return (
                  <Ionicons
                      name='md-list-outline'
                      size={size}
                      color={color}
                  />
              );
            }
          },
        })}
        >
          <Tab.Screen name="Både" children={()=><BoatScreen />} />
          <Tab.Screen name="Profil" children={()=><ProfileScreen />} />
          <Tab.Screen name="Søg" children={()=><SearchScreen/>} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default App