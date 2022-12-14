import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes'


import { Feather } from '@expo/vector-icons';

import { api } from '../../services/api';

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
}

type FinishOrderProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {
    const route = useRoute<FinishOrderProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {
        try {
            await api.put("/order/send", {
                order_id: route.params.order_id,
            });

            navigation.popToTop();

        } catch(err) {
            console.log("Erro ao finalizar, Tente mais tarde")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar este pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={ handleFinish }>
                <Text style={styles.textButton}>Finalizar</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12
    },
    button: {
        backgroundColor: '#3FFFA3',
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})