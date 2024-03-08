//Libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

//Libraries propres au projet
import {formatPokemonId} from "../utils/Routines";

//Composants
import PokemonCard from "../components/pokemonCard";

export default function Home({navigation}){
    const [pokeDatas, setPokeDatas] = useState([]);
    const [nextPage, setNextPage] = useState([]);

    const fetchMoreData = () => {
        fetch(nextPage.toString())
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setPokeDatas([...pokeDatas, ...json.results])
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(json => {
                setNextPage(json.next)
                setPokeDatas(json.results)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <SafeAreaView style={styles.pokemonsList}>
            <FlatList
                numColumns={2}
                data={pokeDatas}
                renderItem={({item}) => <PokemonCard pokemonData={{
                    id: item.url.split('/')[item.url.split('/').length - 2],
                    name: item.name,
                    url: item.url,
                    hash: formatPokemonId(item.url)
                }}
                navigation={navigation}/>}
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