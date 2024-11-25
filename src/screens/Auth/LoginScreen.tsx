import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Header from '../../components/Header';
import Input from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import TextButton from '../../components/TextButton';
import theme from '../../styles/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Lógica de login
    console.log('Login realizado com:', email, senha);
  };

  const handleRegister = () => {
    // Navegar para a tela de registro
    console.log('Navegar para registro');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
    
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/nutritrain_logo.webp')} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <PrimaryButton title="Entrar" onPress={handleLogin} />
          <TextButton title="Não tem uma conta? Registre-se" onPress={handleRegister} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.medium,
    paddingTop: theme.spacing.large,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  logo: {
    width: 100,  // Ajuste o tamanho conforme necessário
    height: 100,
    marginBottom: theme.spacing.medium,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.medium,
  },
});
