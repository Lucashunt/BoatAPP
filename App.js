import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";


import BoatsScreen from "./components/boatRenterComponents/BoatsScreen";
import BoatPostScreen from "./components/boatOwnerComponents/BoatPostScreen";
import SearchScreen from "./components/SearchScreen";
import ProfileLoggedInScreen from "./components/profileComponents/ProfileLoggedInScreen";
import ProfileCreateLoginScreen from "./components/profileComponents/ProfileCreateLoginScreen";
import ProfileLoginScreen from "./components/profileComponents/ProfileLoginScreen";
import ErrorScreen from "./components/ErrorScreen";
import LoadingScreen from "./components/LoadingScreen";
import UpdateProfile from "./components/profileComponents/UpdateProfile";

import Ionicons from "react-native-vector-icons/Ionicons";

import { getBoatOwner, getToken } from "./utils/AuthService.js";

//Her oprettes en instans af tabnavigator.
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [boatOwner, setBoatOwner] = useState(null);
  const checkAuthenticationStatus = async () => {
    
    try {
      const userToken = await getToken();
      if (userToken !== null) {
        setIsAuthenticated(true);
        const boatOwnerData = await getBoatOwner();
        setBoatOwner(boatOwnerData);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    setIsAuthenticated('loading');
    checkAuthenticationStatus();
  }, []);

  const handleTrigger = async () => {
          
    setIsAuthenticated('loading') 
    
    setTimeout(() => {
      checkAuthenticationStatus();
    }, 1000);
}

  return (
    <NavigationContainer>
      {isAuthenticated === "loading" ? (
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : isAuthenticated === false ? (
        <Stack.Navigator>
          <Stack.Screen  name="CreateLogin" children={() => <ProfileCreateLoginScreen onTrigger={handleTrigger} />} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" children={() => <ProfileLoginScreen onTrigger={handleTrigger}/>} />
        </Stack.Navigator>
      ) : isAuthenticated === true ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              {
                display: "flex",
              },
              null,
            ],
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Bådde") {
              } else {
                return (
                  <Ionicons name="md-list-outline" size={size} color={color} />
                );
              }
            },
          })}
        >
          { boatOwner === 'false' ? <Tab.Screen name="Både" component={BoatsScreen} /> : <Tab.Screen name="Opslag" component={BoatPostScreen} /> }
          <Tab.Screen name="ProfileStack" options={{ headerShown: false }}> 
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Profile" children={() => <ProfileLoggedInScreen onTrigger={handleTrigger} />} />
              <Stack.Screen name="UpdateProfile" children={() => <UpdateProfile onTrigger={handleTrigger} />} />
          </Stack.Navigator>
          )}
           </Tab.Screen>
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
           <Stack.Screen name="Error" children={() => <ErrorScreen errorMessage="Der er sket en fejl"/>} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
