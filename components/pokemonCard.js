//Libraries
import React, {useEffect, useState} from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";

export default function PokemonCard({name, url, idPokemon, navigation}) {
    const [uid, setUid] = useState('')

    useEffect(() => {
        if(idPokemon === ""){
            const uid = url.split('/')[url.split('/').length - 2];
            setUid(uid);
        } else{
            const uid = idPokemon;
            setUid(uid);
        }
    }, []);

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${uid}.png`;

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PokemonDetailsScreen', {id:uid})}>
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