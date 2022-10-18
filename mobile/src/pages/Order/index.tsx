import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useRoute, RouteProp} from '@react-navigation/native';

type RouteDetailParams = {
    Order: {
        number: number | string;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    return(
        <View>
            <Text>
                {route.params.number}
                {route.params.order_id}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
})