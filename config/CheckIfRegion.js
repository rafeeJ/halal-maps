import AsyncStorage from "@react-native-async-storage/async-storage";    

const REGION = 'Region';

function setAppLaunched() {
  AsyncStorage.setItem(REGION, 'true');
}

export default async function CheckIfRegion() {
  try {
    const region = await AsyncStorage.getItem(REGION);
    if (region === null) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}