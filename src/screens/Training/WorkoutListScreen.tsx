import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTrainerWorkouts } from '../../api/WorkoutApi';
import { styles } from '../../styles/styles';
import { WorkoutListDTO } from '../../models/WorkoutListDTO';
import theme from '../../styles/theme';
import SecundaryButton from '../../components/SecundaryButton';

const WorkoutListScreen = () => {
    const [workouts, setWorkouts] = useState<WorkoutListDTO[]>([]);
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [page, setPage] = useState(0); // Estado para controlar a página
    const [hasMore, setHasMore] = useState(true); // Controle se há mais páginas para carregar
    const [trainer, setTrainer] = useState({
        photoUrl: 'https://www.example.com/photo.jpg', // Foto de exemplo
        name: 'John Doe',
        registrationNumber: '123456',
    });

    const navigation = useNavigation();

    // Buscar treinos
    useEffect(() => {
        loadWorkouts(page);
    }, [page]);

    const loadWorkouts = async(pageNumber: number) => {
        setLoading(true);
        try {
            const response = await getTrainerWorkouts(pageNumber, 10); // Função para buscar os treinos
            setHasMore(response.pageable.pageNumber < response.totalPages - 1);
            setWorkouts(prevWorkouts => [...prevWorkouts, ...response.content]);
        } catch (error) {
            console.error('Erro ao buscar treinos:', error);
        } finally {
            setLoading(false);
        }
    }

    // Função para marcar o treino como feito
    const handleWorkoutDone = (workoutId: number) => {
        Alert.alert('Treino', `Treino ${workoutId} marcado como feito.`);
        // Aqui você pode enviar uma requisição para atualizar o status do treino no backend
    };

    const renderItem = ({ item }) => (
        <View style={stylesWorkout.card}>
            <Text style={stylesWorkout.workoutName}>{item.name}</Text>
            <Text>Data: {new Date(item.workoutDate).toLocaleDateString()}</Text>
            <View style={stylesWorkout.buttonContainer}>
                <SecundaryButton
                    title="Ta pago!"
                    onPress={() => handleWorkoutDone(item.id)}
                />
            </View>
        </View>
    );

    // Função para carregar mais dados quando o usuário rolar para baixo
    const handleLoadMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1); // Aumentar o número da página
        }
    };

    return (
        <View style={styles.content}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: trainer.photoUrl }} // Substitua pela URL real da foto do aluno
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{trainer.name}</Text>
                <Text style={styles.objective}>Número de Registro: {trainer.registrationNumber}</Text>
            </View>

            <FlatList
                data={workouts}
                keyExtractor={(item) => `${item.id}-${item.studentId}`}
                renderItem={renderItem}
                contentContainerStyle={stylesWorkout.workoutList}
                onEndReached={handleLoadMore} // Chama a função quando o usuário rolar até o final
                onEndReachedThreshold={1} // Quando chegar a 50% do final da lista
                ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null} // Mostrar um loading enquanto carrega
            />
        </View>
    );
};

const stylesWorkout = StyleSheet.create({

    workoutList: {
        padding: 16,
    },
    workoutItem: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    workoutName: {
        color: theme.colors.text,
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: -60,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alinha o botão à direita
    },
});

export default WorkoutListScreen;
