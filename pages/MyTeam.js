import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PokemonCard from "../components/pokemonCard";
import React from "react";

export default function MyTeam({}) {
    return (
        <SafeAreaView>
            <Text>Mon équipe</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});