import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwt_token';
const USER_ID_KEY = 'user_id';

// Armazena o token
export const storeToken = async (data: {userId: number, token: string}) => {
  try {
    console.log(data)
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
    await AsyncStorage.setItem(USER_ID_KEY, '' + data.userId);
  } catch (error) {
    console.error('Erro ao armazenar o token:', error);
  }
};

// Obtém o userId
export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

// Obtém o token
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

// Remove o token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};
