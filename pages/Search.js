import {StatusBar} from 'expo-status-bar';
import React, {useState} from "react";
import {
    StyleSheet,
    TextInput,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    Pressable
} from 'react-native';

//Composants
import PokemonCard from "../components/pokemonCard";

export default function MyTeam({navigation}) {
    const [searchValue, onChangeText] = useState("");
    const [returnText, setReturnText] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [pokemonImage, setPokemonImage] = useState("");

    const searchPokemon = async (pokemonName) => {
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

    const eraseFormSearch = () => {
        onChangeText("")
        setReturnText("")
        setPokemon([])
        setPokemonImage("")
    }

    return (
        <SafeAreaView>
            <View>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={searchValue}
                        placeholder="Pikachu"
                    />
                    <Pressable onPress={eraseFormSearch}>
                        <Image
                            style={styles.eraseForm}
                            source={require('../assets/images/close.png')}
                        />
                    </Pressable>
                </View>
                <TouchableOpacity style={styles.btnSearch} onPress={() => searchPokemon(searchValue)}>
                    <Text style={styles.btnTextSearch}>Rechercher</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.resultSearch}>
                {pokemonImage !== "" ?
                    <SafeAreaView>
                        <PokemonCard
                            pokemonData={{
                                name: pokemon.name,
                                url: pokemon.url,
                                id: pokemon.id,
                            }}
                            navigation={navigation}
                        />
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
    resultSearch: {
        margin: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    eraseForm: {
        position: "absolute",
        top: -49.5,
        right: 17,
        width: 35,
        height: 35,
    },
    btnSearch: {
        backgroundColor: "#ab0505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 12,
        padding: 10,
        borderRadius: 50,
    },
    btnTextSearch: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    }
});