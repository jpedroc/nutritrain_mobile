import React, { useState } from 'react';
import {
    ScrollView,
    Alert,
    View,
} from 'react-native';
import StudentForm from './StudentForm';
import { register } from '../../api/AuthenticationApi';
import { Gender, UserDTO, UserType } from '../../models/UserDTO';
import InputField from '../../components/InputField';
import { styles } from '../../styles/styles';
import PrimaryButton from '../../components/PrimaryButton';

export default function RegisterScreen({ navigation }: { navigation: any }) {
    // Estados para os campos gerais
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type] = useState(UserType.STUDENT); // Tipo padrão

    // Estados para os campos do aluno
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [objective, setObjective] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [gender, setGender] = useState(Gender.FEMALE); // Gênero padrão

    const handleRegister = async () => {
        const data: UserDTO = {
            name,
            email,
            password,
            type,
            student: {
                weight: parseFloat(weight),
                height: parseFloat(height),
                objective,
                birthDate,
                gender,
            }
        };

        register(data)
            .then(() => {
                navigation.navigate('Login')
                Alert.alert('Registro realizado com sucesso!');
            })
            .catch(error => {
                console.error(error);
                Alert.alert(error.message)
            });
       
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formContainer}>
                <InputField
                    label='Nome'
                    value={name}
                    onChangeText={setName}
                    placeholder="Digite seu nome"
                />

                <InputField
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu email"
                    keyboard="email-address"
                />

                <InputField
                    label='Senha'
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
                    secureTextEntry
                />

                <StudentForm
                    weight={weight}
                    setWeight={setWeight}
                    height={height}
                    setHeight={setHeight}
                    objective={objective}
                    setObjective={setObjective}
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                    gender={gender}
                    setGender={setGender}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <PrimaryButton title="Registrar" onPress={handleRegister} />
            </View>
        </ScrollView>
    );
}
