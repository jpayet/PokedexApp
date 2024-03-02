import {StatusBar} from 'expo-status-bar';
import {StyleSheet, TextInput, SafeAreaView, Button, View, Image, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from "react";

//Composants
import PokemonCard from "../components/pokemonCard";

export default function MyTeam({navigation}) {

    const [searchValue, onChangeText] = useState("");
    const [returnText, setReturnText] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [pokemonImage, setPokemonImage] = useState("");

    async function searchPokemon(pokemonName){
        try {

            if(pokemonName){
                pokemonName = pokemonName.toLowerCase()
            } else {
                setReturnText("Veuillez entrer un nom de pokémon.")
                setPokemon([])
                setPokemonImage("")
                return;
            }

            const reqApi = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            const response = await fetch(reqApi)

            if(!response.ok){
                setReturnText("Désolé... Il n'y a pas de pokémons portant ce nom.")
                setPokemon([])
                setPokemonImage("")
                return;
            }

            const json = await response.json();
            setPokemon(json);

            const pokemonId = json.id
            setPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`)

        } catch (error) {
            console.error(error)
        }
    }

    function eraseFormSearch(){
        onChangeText("")
        setReturnText("")
        setPokemon([])
        setPokemonImage("")
    }

    return (
        <SafeAreaView>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={searchValue}
                    placeholder="Rechercher"
                />
                <Button
                    title="Rechercher"
                    onPress={() => searchPokemon(searchValue)}
                />
                <Button
                    title="Effacer la recherche"
                    onPress={() => eraseFormSearch()}
                />
            </View>
            <View>
                {pokemonImage !== "" ?
                    <SafeAreaView>
                        <PokemonCard name={pokemon.name} url={pokemon.url} idPokemon={pokemon.id} navigation={navigation}/>
                        <StatusBar style="auto" />
                    </SafeAreaView>
                :
                    <Text>{returnText}</Text>
                }
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
});