import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function RegionPicker({ setRegion }) {

    return (
        <Picker
            selectedValue={region}
            onValueChange={(val, idx) => setRegion(val)}
        >
            <Picker.Item label={"Manchester"} value={"manchester"} />
        </Picker>
    );
}