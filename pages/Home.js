//Libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

//Pages
import PokemonCard from "../components/pokemonCard";

export default function Home(){

    const [pokeDatas, setPokeDatas] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(json => {
                setPokeDatas(json.results)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <SafeAreaView style={styles.pokemonsList}>
            <FlatList
                numColumns={3}
                data={pokeDatas}
                renderItem={({item}) => <PokemonCard name={item.name} url={item.url}/>}
                keyExtractor={item => item.name}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pokemonsList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
