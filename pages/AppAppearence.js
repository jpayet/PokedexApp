//Libraries
import React, {useState} from "react";
import {View, StyleSheet, Text, Switch} from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function AppAppearence() {
    const [Orientation, setOrientation] = useState(false);

    const changeScreenOrientation = async (value) => {
        setOrientation(value);
        if (value) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.labelText}>Basculer l'application en mode paysage</Text>
            <Switch
                value={Orientation}
                onValueChange={(value) => changeScreenOrientation(value)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop : 10,
        marginLeft: 20,
        paddingRight: 20,
        gap: 10,
    },
    labelText: {
        fontSize: 16,
    },
});
