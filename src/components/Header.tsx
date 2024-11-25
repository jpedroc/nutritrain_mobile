import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import theme from '../styles/theme';

interface HeaderProps {
  logo: any; // A logo será passada como prop (importada como imagem)
}

const Header = ({ logo }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>NutriTrain</Text>
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
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
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
    color: theme.colors.primary,
    fontSize: theme.fontSizes.large,
    fontWeight: 'bold',
  },
});

export default Header;
