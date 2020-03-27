import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    function navigationToDetail(incident) {
        navigation.navigate('Details', { incident });
    }
    async function loadIncidents() {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([...incidents, ...useStateresponse.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.descripition}>Escolha um dos casos a baixo e salve o dia</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incient => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incidentList}>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>Caso:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                            <TouchableOpacity style={styles.detailsButton}
                                onPress={() => navigationToDetail(incidents)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes0</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    )
}