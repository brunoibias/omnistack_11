import React from 'react';
import { StyleSheet, Text, View, Image, Linking } from 'react-native';
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

export default function Destails() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`
    function navigationBack() {
        navigation.goBack()
    }
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`watsapp://sendphone=${incident.watsapp}&text=${message}`)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

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
            <View style={styles.cotactBox}>
                <Text style={styles.heroeTitle}>Salve o dia!!!</Text>
                <Text style={styles.heroeTitle}>Seja o heroi deste caso</Text>

                <Text style={styles.heroeDescription}>Entre em contato:</Text>

                <View style={styles.action}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}