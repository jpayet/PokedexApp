//Libraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Pages
import HomeScreen from '../pages/Home';
import PokemonDetailsScreen from '../pages/PokemonDetails';

//Variables
const Stack = createNativeStackNavigator();

function PokemonListStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "Liste des pokémons",
            }}/>
            <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetailsScreen} options={{
                title: "Informations du pokémon"
            }} />
        </Stack.Navigator>
    );
}

export default PokemonListStack;