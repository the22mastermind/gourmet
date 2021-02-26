import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

const getData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data;
}

const clearAllData = async () => {
  await AsyncStorage.clear();
};

export default {
  storeData,
  getData,
  clearAllData,
};
