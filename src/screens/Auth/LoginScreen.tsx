import styles from '../../styles/LoginScreen.styles'; 
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import InputField from "../../components/InputField";
import FilledButton from "../../components/FilledButton";
import UnfilledButton from "../../components/UnfilledButton";

// Define os tipos para navegação
type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok && data.token) {
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                // Redireciona para a tela principal
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', 'Credenciais inválidas!');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Algo deu errado, tente novamente!');
        }
    };

    return (
        <View style={styles.container}>
            <InputField
                placeholder="Email"
                style={styles.materialUnderlineTextbox1}
            ></InputField>

            <InputField
                placeholder="Senha"
                style={styles.materialUnderlineTextbox12}
            ></InputField>

            <FilledButton
                title="Entrar"
                onPress={handleLogin}
            ></FilledButton>

            <UnfilledButton
                caption="Registrar-se"
                style={styles.materialButtonWithVioletText}
            ></UnfilledButton>

            <Image
                source={require("../../../assets/nutritrain_logo.webp")}
                resizeMode="contain"
                style={styles.image}
            ></Image>
        </View>
        );
};

export default LoginScreen;
