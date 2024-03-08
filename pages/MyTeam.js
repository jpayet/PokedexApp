//Librairies
import {StatusBar} from 'expo-status-bar';
import React, {useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

//Libraries propres au projet
import {getData} from "../utils/StorageService";

//Pages
import PokemonTeamCard from "../components/pokemonTeamCard";

export default function MyTeam({navigation}) {
    const [myTeam, setMyTeam] = useState([]);

    const clear = async () => {
        await AsyncStorage.removeItem('myTeam')
        await AsyncStorage.removeItem('teamCount')
        setMyTeam([])
    }

    useFocusEffect(() => {
        getData('myTeam').then((myTeam) => {
            if (myTeam) {
                setMyTeam(JSON.parse(myTeam))
            }
        })
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.flatlist}
                    data={myTeam}
                    renderItem={({ item }) => <PokemonTeamCard pokemon={item} url={item.url} idPokemon={item.id} navigation={navigation} />}
                    keyExtractor={item => item.id}
                />
                <View >
                    <TouchableOpacity style={styles.releaseBox} onPress={() => {clear()}}>
                        <Image style={styles.releaseImage} source={require('../assets/images/icon-releasing.png')}/>
                        <Text style={styles.releaseText}>Relâcher toute l'équipe</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    flatlist: {
        height: '90%'
    },
    releaseBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin : 10,
        padding: 10,
        gap: 10,
        backgroundColor: '#ab0505',
        borderRadius: 50
    },
    releaseImage: {
        width: 30,
        height: 30,
    },
    releaseText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    }
});