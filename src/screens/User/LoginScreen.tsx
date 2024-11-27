import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Input from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import TextButton from '../../components/TextButton';
import theme from '../../styles/theme';
import { login } from '../../api/AuthenticationApi';
import { LoginDTO } from '../../models/LoginDTO';
import { storeToken } from '../../utils/TokenStorage';
import { Alert } from 'react-native';

export default function LoginScreen({ navigation }: { navigation: any }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const data: LoginDTO = { email, password };
		try {
			const token = await login(data);
			await storeToken(token);
			navigation.navigate('Home');
		} catch (error) {
			console.log(error);
			Alert.alert('Erro ao fazer login', 'Verifique suas credenciais.');
		}
	};

	const handleRegister = () => {
		navigation.navigate('Register');
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
						value={password}
						onChangeText={setPassword}
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
		width: 120,  // Ajuste o tamanho conforme necessário
		height: 120,
		marginBottom: theme.spacing.medium,
	},
	formContainer: {
		width: '100%',
		paddingHorizontal: theme.spacing.medium,
	},
});
