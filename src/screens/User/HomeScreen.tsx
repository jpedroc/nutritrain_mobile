import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileInfo from '../../components/ProfilelInfo';
import { ProfilelInfoDTO } from '../../models/ProfessionalInfoDTO';
import { getProfile } from '../../api/AuthenticationApi';
import { UserType } from '../../models/UserDTO';

const HomeScreen = () => {
    const [user, setProfile] = useState<ProfilelInfoDTO | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        setLoading(true);
        try {
            const response = await getProfile(UserType.STUDENT); // API para pegar dados do gráfico
            setProfile(response);
        } catch (error) {
            console.error('Error fetching profile info', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            {!loading && user ? <ProfileInfo profile={user}></ProfileInfo> : null}

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

