import AsyncStorage from '@react-native-async-storage/async-storage';
    
function setAppLaunched() {
  AsyncStorage.setItem('@First_use', 'true');
}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem('@First_use');
    console.log(hasLaunched)
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
  }
}