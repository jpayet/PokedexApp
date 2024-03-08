//Libraries
import React, {useEffect, useState} from "react";
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native";

//Libraries propres au projet
import {capitalize, formatPokemonId, getBackgroundColor, typeImages} from "../utils/Routines";

export default function PokemonTeamCard({pokemon, url, idPokemon, navigation}) {
    const [uid, setUid] = useState('')
    const [randomLevel, setRandomLevel] = useState(1);

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${uid}.png`;

    useEffect(() => {
        if(idPokemon === ""){
            const uid = url.split('/')[url.split('/').length - 2];
            setUid(uid);
        } else{
            const uid = idPokemon;
            setUid(uid);
        }

        const randomLevel = Math.floor(Math.random() * 100) + 1;
        setRandomLevel(randomLevel);
    }, []);


    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PokemonDetailsScreen', {id:uid})}>
            <View style={styles.pokemonImage}>
                <Image style={styles.image} source={{uri: image}}/>
            </View>
            <View style={styles.pokemonInfos}>
                <View>
                    <View style={styles.nameHash}>
                        <Text style={styles.pokemonName}>{capitalize(pokemon.name)}</Text>
                        <Text style={styles.hash}>{formatPokemonId(idPokemon)}</Text>
                    </View>
                    <View style={styles.typesBox}>
                        {pokemon.types.map((type, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.ptypesrow,
                                    { backgroundColor: getBackgroundColor(type.type.name) },
                                ]}
                            >
                                <Image
                                    style={styles.typeImage}
                                    source={typeImages[type.type.name]}
                                />
                                <Text style={styles.ptypes}>{capitalize(type.type.name)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.levelBox}>
                    <Text style={styles.levelText}>Niveau </Text>
                    <Text style={[styles.levelNumber, randomLevel === 100 ? {color: 'red'} : null]}>{randomLevel}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: '#f2f2f2',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    pokemonImage: {
        width: '30%',
        padding: 5,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    nameHash: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    hash: {
        color: 'lightgrey',
        fontSize: 22,
        opacity: 0.5,
    },
    pokemonName:{
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
    },
    pokemonInfos: {
        paddingVertical: 15,
        paddingRight: 20,
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    levelBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelText: {
        color: 'black',
        fontSize: 15,
    },
    levelNumber: {
        color: 'black',
        fontSize: 40,
    },
    typesBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 10,
    },
    ptypes: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    typeImage: {
        width: 15,
        height: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    ptypesrow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'lightgrey',
        paddingVertical: 5,
        paddingLeft: 7,
        paddingRight: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
})