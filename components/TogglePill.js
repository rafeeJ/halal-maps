import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-elements/dist/buttons/Chip';


export default function TogglePill({ title, id, callback, toggled}) {
    const [toggle, setToggle] = useState(false)

    return (
        <View>
            <Chip onPress={() => callback(title, id)} 
            title={title} 
            icon={
                toggled ? 
                {
                    name: 'close',
                    type: 'font-awesome',
                    size: 20,
                    color: 'white',
                  } : null
            }
            iconRight={false}
            containerStyle={{ marginVertical: 5, marginHorizontal: 5 }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    SAView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    list: {
        paddingHorizontal: 5
    }
})