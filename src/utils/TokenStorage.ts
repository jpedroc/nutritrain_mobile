import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwt_token';
const USER_ID_KEY = 'user_id';

// Armazena o token
export const storeToken = async (data: {id: number, token: string}) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
    await AsyncStorage.setItem(USER_ID_KEY, '' + data.id);
  } catch (error) {
    console.error('Erro ao armazenar o token:', error);
  }
};

// Obtém o userId
export const getUserId = async () => {
  try {
    const userIdString = await AsyncStorage.getItem(USER_ID_KEY);
    const userId =  userIdString ? Number(userIdString) : null; 
    return userId;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

// Obtém o token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

// Remove o token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};
