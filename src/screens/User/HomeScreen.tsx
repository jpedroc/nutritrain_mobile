import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.content}>
            {/* Foto de perfil e informações do aluno */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pela URL real da foto do aluno
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Nome do Aluno</Text>
                <Text style={styles.objective}>Objetivo: Ganho de Massa</Text>
            </View>

            {/* Botões de navegação */}
            <View style={styles.buttonsHomeContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('WorkoutList')}
                >
                    <Text style={styles.buttonText}>Treino</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('DietPlanList')}
                >
                    <Text style={styles.buttonText}>Dieta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Progress')}
                >
                    <Text style={styles.buttonText}>Progresso</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

};


export default HomeScreen;

