import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import BoatsScreen from "./components/boatRenterComponents/BoatsScreen";
import BoatPostScreen from "./components/boatOwnerComponents/BoatPostScreen";
import SearchScreen from "./components/boatRenterComponents/SearchScreen";
import ProfileLoggedInScreen from "./components/profileComponents/ProfileLoggedInScreen";
import ProfileCreateLoginScreen from "./components/profileComponents/ProfileCreateLoginScreen";
import ProfileLoginScreen from "./components/profileComponents/ProfileLoginScreen";
import ErrorScreen from "./components/ErrorScreen";
import LoadingScreen from "./components/LoadingScreen";
import UpdateProfile from "./components/profileComponents/UpdateProfile";

import Ionicons from "react-native-vector-icons/Ionicons";

import { getBoatOwner, getToken } from "./utils/AuthService.js";
import BoatScreen from "./components/boatRenterComponents/BoatScreen";

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
    setIsAuthenticated("loading");
    checkAuthenticationStatus();
  }, []);

  const handleTrigger = async () => {
    setIsAuthenticated("loading");

    setTimeout(() => {
      checkAuthenticationStatus();
    }, 1000);
  };

  return (
    <NavigationContainer>
      {isAuthenticated === "loading" ? (
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : isAuthenticated === false ? (
        <Stack.Navigator>
          <Stack.Screen
            name="CreateLogin"
            children={(props) => (
              <ProfileCreateLoginScreen onTrigger={handleTrigger} {...props} />
            )}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            children={(props) => <ProfileLoginScreen onTrigger={handleTrigger} {...props}/>}
          />
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
          {boatOwner === "false" ? (
            <Tab.Screen
              name="Både"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Tab.Screen name="Opslag" component={BoatPostScreen} />
          )}
          <Tab.Screen name="ProfileStack" options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Profile"
                  children={(props) => (
                    <ProfileLoggedInScreen onTrigger={handleTrigger} {...props}/>
                  )}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="UpdateProfile"
                  children={(props) => <UpdateProfile onTrigger={handleTrigger} {...props}/>}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen name="BoatPostStack" options={{ headerShown: false }}>
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Search"
                  children={(props) => <SearchScreen {...props} />}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BoatScreen"
                  children={(props) => <BoatScreen {...props} />}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Error"
            children={(props) => <ErrorScreen errorMessage="Der er sket en fejl" {...props}/>}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
