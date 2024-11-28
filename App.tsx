import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Header from './src/components/Header';
import LoginScreen from './src/screens/User/LoginScreen';
import RegisterScreen from './src/screens/User/RegisterScreen';
import WorkoutListScreen from './src/screens/Training/WorkoutListScreen';
import HomeScreen from './src/screens/User/HomeScreen';

// Importando suas telas

// Configuração do Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, // Customizando o header para todas as telas
        }}
      >
        {/* Não mostra o header nas telas de Login e Registro */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Ocultar o header
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }} // Ocultar o header
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }} // Ocultar o header
        />
        {/* Para outras telas, o header estará visível */}
        <Stack.Screen
          name="WorkoutList"
          component={WorkoutListScreen}
          options={{ title: 'Lista de Treinos' }} // Título da tela
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
