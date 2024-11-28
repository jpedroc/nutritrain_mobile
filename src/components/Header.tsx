import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';
import { removeToken } from '../utils/TokenStorage';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await removeToken(); // Remove o token e outros dados salvos
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // Redireciona para a tela de login
      });
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/nutritrain_logo.webp')} style={styles.logo} />
      <Text style={styles.title}>NutriTrain</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',  // Torna o header fixo no topo
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    zIndex: 10,  // Garante que o header fique acima do restante do conteúdo
  },
  logo: {
    width: 40, // Ajuste o tamanho conforme necessário
    height: 40,
    marginRight: theme.spacing.small,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#D32F2F', // Vermelho para indicar logout
    borderRadius: 5,
  },
  logoutText: {
    color: theme.colors.text,
    fontWeight: 'bold',
  },
});

export default Header;
