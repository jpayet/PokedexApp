//Libraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from "react-native";

//Pages
import HomeScreen from '../pages/Home';
import PokemonDetailsScreen from '../pages/PokemonDetails';
import SearchScreen from '../pages/Search';
import MyTeamScreen from '../pages/MyTeam';
import SettingsScreen from '../pages/Settings';
import MyProfilScreen from '../pages/MyProfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PokemonAllListStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "Liste des pokémons"
            }}/>
            <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetailsScreen} options={{
                title: "Informations du pokémon"
            }} />
        </Stack.Navigator>
    );
}

function PokemonTeamStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="MyTeamScreen" component={MyTeamScreen} options={{
                title: "",
                headerShown: false,
            }}/>
            <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetailsScreen} options={{
                title: "Informations du pokémon"
            }} />
        </Stack.Navigator>
    );
}

function SettingsStack() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{
                title: "",
                headerShown: false,
            }}/>
            <Stack.Screen name="MyProfilScreen" component={MyProfilScreen} options={{
                title: "Mon profil"
            }} />
        </Stack.Navigator>
    );
}

function TabsNavigation({navigation, route}) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PokemonListStack" component={PokemonAllListStack} options={{
                headerTitle: () => (
                    <Image source={require('../assets/images/logo_pokedex.png')} style={{width: 150, height: 50}}/>
                ),
                title: "Pokemons",
                headerStyle: {
                    backgroundColor: '#ab0505',
                    height: 110,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabBarIcon: () => (
                    <Image source={require('../assets/images/nav-pokemons.png')} style={{width: 30, height: 30}}/>
                ),
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                headerTitle: () => (
                    <Image source={require('../assets/images/logo_pokedex.png')} style={{width: 150, height: 50}}/>
                ),
                title: "Rechercher",
                headerStyle: {
                    backgroundColor: '#ab0505',
                    height: 110,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabBarIcon: () => (
                    <Image source={require('../assets/images/nav-search.png')} style={{width: 30, height: 30}}/>
                ),
            }}/>
            <Tab.Screen name="PokemonTeamStack" component={PokemonTeamStack} options={{
                headerTitle: () => (
                    <Image source={require('../assets/images/logo_pokedex.png')} style={{width: 150, height: 50}}/>
                ),
                title: "Mon équipe",
                headerStyle: {
                    backgroundColor: '#ab0505',
                    height: 110,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabBarIcon: () => (
                    <Image source={require('../assets/images/nav-team.png')} style={{width: 30, height: 30}}/>
                ),
            }}/>
            <Tab.Screen name="SettingsStack" component={SettingsStack} options={{
                headerTitle: () => (
                    <Image source={require('../assets/images/logo_pokedex.png')} style={{width: 150, height: 50}}/>
                ),
                title: "Paramètres",
                headerStyle: {
                    backgroundColor: '#ab0505',
                    height: 110,
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabBarIcon: () => (
                    <Image source={require('../assets/images/nav-settings.png')} style={{width: 30, height: 30}}/>
                ),
            }}/>
        </Tab.Navigator>
    );
}

export default TabsNavigation;