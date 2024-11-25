import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';

// Define os tipos das rotas
type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                {/* Adicione as outras telas conforme necessário */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}