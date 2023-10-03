import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async ({userToken, userID, boatOwner}) => {
  console.log(userToken, userID, boatOwner)
  try {
    await AsyncStorage.setItem('userToken', userToken);
    await AsyncStorage.setItem('userID', userID);
    await AsyncStorage.setItem('boatOwner', boatOwner);
  } catch (error) {
    // Handle errors
  }
};

export const updateBoatOwner = async (boatOwner) => {
  
  try {
    await AsyncStorage.setItem('boatOwner', boatOwner);
  } catch (error) {
    // Handle errors
  }
};

export const getToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken !== null) {
      
      return userToken
    } else {
     return null
    }

    
  } catch (error) {
    // Handle errors
   
    return null;
    
  }
};

export const getID = async () => {
  try {
    const userID = await AsyncStorage.getItem('userID');
    if (userID !== null) {
      
      return userID
    } else {
     return null
    }

    
  } catch (error) {
    // Handle errors
   
    return null;
    
  }
};

export const getBoatOwner = async () => {
  try {
    const boatOwner = await AsyncStorage.getItem('boatOwner');
   
    if (boatOwner !== null) {
      
      return boatOwner
    } else {
     return null
    }

    
  } catch (error) {
    // Handle errors
   
    return null;
    
  }
};

export const logout = async () => {

  try {

    await AsyncStorage.removeItem('userToken');
    
  } catch (error) {
    // Handle errors
  }
}