import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Gender } from '../../models/UserDTO';
import Input from '../../components/InputField';
import { styles } from '../../styles/styles';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomPicker from '../../components/CustomPicker';

interface StudentFormProps {
    weight: string;
    setWeight: (value: string) => void;
    height: string;
    setHeight: (value: string) => void;
    objective: string;
    setObjective: (value: string) => void;
    birthDate: Date;
    setBirthDate: (value: Date) => void;
    gender: Gender;
    setGender: (value: Gender) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
    weight,
    setWeight,
    height,
    setHeight,
    objective,
    setObjective,
    birthDate,
    setBirthDate,
    gender,
    setGender,
}) => {
    return (
        <View>
            <Input
                label='Peso (kg)'
                value={weight}
                onChangeText={setWeight}
                placeholder="Digite seu peso"
                keyboard="numeric"
            />

            <Input
                label='Altura (m)'
                value={height}
                onChangeText={setHeight}
                placeholder="Digite sua altura"
                keyboard="numeric"
            />

            <Input
                label='Objetivo'
                value={objective}
                onChangeText={setObjective}
                placeholder="Digite seu objetivo"
            />

            <CustomDatePicker
                label="Data de Nascimento "
                value={birthDate}
                onChange={(newDate) => setBirthDate(newDate)}
            />

            <CustomPicker
                label="Gênero"
                selectedValue={gender}
                onValueChange={(value: Gender) => setGender(value)}
                items={[
                    { label: 'Masculino', value: 'MALE' },
                    { label: 'Feminino', value: 'FEMALE' },
                ]}
            />
        </View>
    );
};


export default StudentForm;
