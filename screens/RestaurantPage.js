import { useRoute } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RestaurantPage(props) {
    const route = useRoute()
    const { restaurant } = route.params

    return (
        <SafeAreaView style={styles.SAView}>
            <Text>Hello {restaurant.name}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SAView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
})