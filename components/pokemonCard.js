//Libraries
import React from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function PokemonCard({name, url}) {

    const id = url.split('/')[url.split('/').length - 2];
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <TouchableOpacity style={styles.card}>
            <Image style={styles.image} source={{uri: image}}/>
            <View style={styles.titleDiv}>
                <Text style={styles.title}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    title:{
        fontWeight: 'bold',
        color: 'white',
    },
    titleDiv: {
        backgroundColor: '#ab0000',
        padding: 5,
        borderRadius: 3,
    }
})