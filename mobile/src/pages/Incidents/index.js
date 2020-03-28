import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import style from './style';
import logoImg from '../../assets/logo.png';

export default function Incidents() {
	const navigation = useNavigation();
	
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	function navigateToDetail(incident) {
		navigation.navigate('Detail', {
			incident
		});
	}

	async function loadIncidents() {
		if (loading) {
			return;
		}
		if (total > 0 && incidents.length === total) {
			return;
		}
		setLoading(true);

		const response = await api.get(`incidents?page=${page}`);

		setIncidents([...incidents, ...response.data]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);

		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={style.container}>
			<View style={style.header}>
				<Image source={logoImg} />
				<Text style={style.headerText}>
					Total de <Text style={style.strong}>{total} casos</Text>.
				</Text>
			</View>

			<Text style={style.title}>Bem-vindo(a)!</Text>
			<Text style={style.description}>Escolha um dos casos abaixo e salve o dia!</Text>

			<FlatList style={style.incidentList} showsVerticalScrollIndicator={false} data={incidents} keyExtractor={incident => String(incident.id)} renderItem={({item: incident}) => (
				<View style={style.incident}>
					<Text style={style.incidentProperty}>ONG:</Text>
					<Text style={style.incidentValue}>{incident.nome}</Text>

					<Text style={style.incidentProperty}>Caso:</Text>
					<Text style={style.incidentValue}>{incident.title}</Text>

					<Text style={style.incidentProperty}>Valor:</Text>
					<Text style={style.incidentValue}>
						{Intl.NumberFormat('pt-BR', {
							style: 'currency',
							currency: 'BRL'
						}).format(incident.value)}
					</Text>

					<TouchableOpacity style={style.detailsButton} onPress={() => navigateToDetail(incident)}>
						<Text style={style.detailsButtonText}>Ver mais detalhes</Text>
						<Feather name='arrow-right' size={16} color='#E02042' />
					</TouchableOpacity>
				</View>
			)} onEndReached={loadIncidents} onEndReachedThreshold={0.3} />
		</View>
	);
}