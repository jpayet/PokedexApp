//Libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from 'react-native';

export default function PokemonDetails({route, navigation}) {

    const {id} = route.params;
    const [pokemon, setPokemon] = useState([]);
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
    console.log(pokemonImage)

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(json => {
                setPokemon(json)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={styles.parentBox}>
            <Image style={styles.image} source={{uri: pokemonImage}}/>
            <Text>{id}</Text>
            <Text>Nom: {pokemon.name}</Text>
            <Text>Taille : {pokemon.height}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    parentBox: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center"
    },
    image: {
        width: 100,
        height: 100,
    },
});