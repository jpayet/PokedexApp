//Libraries
import React, {useEffect, useState} from "react";
import {Image, Text, StyleSheet, TouchableOpacity} from "react-native";

//Libraries propres au projet
import {capitalize} from "../utils/Routines";

export default function PokemonCard({pokemonData, idPokemon, navigation}) {
    const [uid, setUid] = useState('')
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${uid}.png`;

    useEffect(() => {
        if(pokemonData.id === ""){
            const uid = pokemonData.url.split('/')[pokemonData.url.split('/').length - 2];
            setUid(uid);
        } else{
            const uid = pokemonData.id;
            setUid(uid);
        }
    }, []);


    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PokemonDetailsScreen', {id:uid})}>
            <Image style={styles.image} source={{uri: image}}/>
            <Text style={styles.phash}>{pokemonData.hash}</Text>
            <Text style={styles.pname}>{capitalize(pokemonData.name)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 185,
        height: 255,
        margin: 10,
        padding: 10,
        paddingTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: 150,
        height: 150,
    },
    phash:{
        margin: 10,
        fontSize: 14,
        color: 'grey',
    },
    pname:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    ptype:{
        color: 'black',
    },
})