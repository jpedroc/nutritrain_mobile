import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileInfo from '../../components/ProfilelInfo';
import { styles } from '../../styles/styles';
import { ProfilelInfoDTO } from '../../models/ProfessionalInfoDTO';
import { DietPlanRootStackParamList } from '../../navigation/DietPlanType';
import { StackNavigationProp } from '@react-navigation/stack';
import { getDietPlans } from '../../api/DietPlanApi';
import { DietPlanListDTO, StatusEnum } from '../../models/DietPlanListDTO';
import { UserType } from '../../models/UserDTO';
import { getProfile } from '../../api/AuthenticationApi';

type DietPlanListScreenNavigationProp = StackNavigationProp<DietPlanRootStackParamList, 'DietPlanDetail'>;

export const DietPlanListScreen = () => {
	const [activePlans, setActivePlans] = useState<DietPlanListDTO[]>([]);
	const [inactivePlans, setInactivePlans] = useState<DietPlanListDTO[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const navigation = useNavigation<DietPlanListScreenNavigationProp>();
	const [nutri, setNutri] = useState<ProfilelInfoDTO | null>(null);

	useEffect(() => {
		fetchMealPlans(page);
		fetchNutritionistInfo();
	}, [page]);

	const fetchNutritionistInfo = async () => {
		setLoading(true);
		try {
			const response = await getProfile(UserType.NUTRITIONIST);
			setNutri(response);
		} catch (error) {
			console.error('Error fetching nutritionist profile info', error);
		} finally {
			setLoading(false);
		}
	}

	const fetchMealPlans = async (pageNumber: number) => {
		setLoading(true);
		try {
			const plans = await getDietPlans(pageNumber, 10);
			setHasMore(plans.pageable.pageNumber < plans.totalPages - 1);

			// Atualizando separadamente para evitar inconsistências de estado
			setActivePlans((prev) =>
				pageNumber === 0
					? plans.content.filter((plan: DietPlanListDTO) => plan.status === StatusEnum.ENABLED)
					: [...prev, ...plans.content.filter((plan: DietPlanListDTO) => plan.status === StatusEnum.ENABLED)]
			);
			setInactivePlans((prev) =>
				pageNumber === 0
					? plans.content.filter((plan: DietPlanListDTO) => plan.status === StatusEnum.DISABLED)
					: [...prev, ...plans.content.filter((plan: DietPlanListDTO) => plan.status === StatusEnum.DISABLED)]
			);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const toDetails = (item: DietPlanListDTO) => {
		navigation.navigate('DietPlanDetail', {
			dietId: item.id,
			dietDescription: item.description,
			trainer: nutri,
		});
	};

	const handleLoadMore = () => {
		if (hasMore && !loading) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const renderPlanItem = ({ item }: { item: DietPlanListDTO }) => (
		<TouchableOpacity style={stylesDiet.planItem} onPress={() => toDetails(item)}>
			<Text style={stylesDiet.planDescription}>{item.description}</Text>
		</TouchableOpacity>
	);

	return (
		<View style={[styles.content, { flex: 0, paddingHorizontal: 16 }]}>
			<ProfileInfo profile={nutri} />
			<Text style={stylesDiet.sectionTitle}>Plano alimentar ativo</Text>
			<FlatList
				data={activePlans}
				renderItem={renderPlanItem}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={
					!loading && activePlans.length === 0 ? (
						<Text style={stylesDiet.emptyText}>Nenhum plano ativo.</Text>
					) : null
				}
				contentContainerStyle={{
					flexGrow: 0, // Faz o FlatList ocupar apenas o espaço necessário
				}}
				scrollEnabled={false} // Evita comportamento de rolagem para listas pequenas
			/>
			<Text style={stylesDiet.sectionTitle}>Planos alimentares inativos</Text>
			<FlatList
				data={inactivePlans}
				renderItem={renderPlanItem}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.8}
				ListFooterComponent={
					loading ? (
						<ActivityIndicator size="large" />
					) : inactivePlans.length === 0 ? (
						<Text style={stylesDiet.emptyText}>Nenhum plano desativado.</Text>
					) : null
				}
				contentContainerStyle={[
					stylesDiet.container,
					inactivePlans.length === 0 && stylesDiet.centerEmptyList, // Centraliza caso a lista esteja vazia
				]}
			/>

		</View>
	);
};

const stylesDiet = StyleSheet.create({
	container: {
		paddingBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#4A00E0',
		marginVertical: 8,
	},
	planItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderColor: '#ddd',
	},
	planDescription: {
		fontSize: 16,
		color: '#333',
	},
	emptyText: {
		fontSize: 14,
		color: '#999',
		textAlign: 'center',
		marginVertical: 16,
	},
	centerEmptyList: {
		flexGrow: 1, // Permite que o conteúdo cresça para centralizar
		justifyContent: 'center', // Centraliza verticalmente
		alignItems: 'center', // Centraliza horizontalmente
	},
});
