//Libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';

//Composants
import PokemonCard from "../components/pokemonCard";

export default function Home({navigation}){

    const [pokeDatas, setPokeDatas] = useState([]);
    const [nextPage, setNextPage] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setPokeDatas(json.results)
            })
            .catch(error => console.error(error));
    }, []);

    const fetchMoreData = () => {
        fetch(nextPage.toString())
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setPokeDatas([...pokeDatas, ...json.results])
            })
            .catch(error => console.error(error));
    }

    return (
        <SafeAreaView style={styles.pokemonsList}>
            <FlatList
                numColumns={3}
                data={pokeDatas}
                renderItem={({item}) => <PokemonCard name={item.name} url={item.url} idPokemon="" navigation={navigation}/>}
                keyExtractor={item => item.name}
                onEndReached={fetchMoreData}
                onEndReachedThreshold={0.5}
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