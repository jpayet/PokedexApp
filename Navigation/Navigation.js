//Libraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Pages
import HomeScreen from '../pages/Home';
import PokemonDetailsScreen from '../pages/PokemonDetails';
import SearchScreen from '../pages/Search';
import MyTeamScreen from '../pages/MyTeam';
import SettingsScreen from '../pages/Settings';

//Variables
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

function TabsNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="PokemonListStack" component={PokemonListStack} options={{
                title: "Pokedex",
                headerStyle: {
                    backgroundColor: '#ab0505',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                }
            }}/>
            <Tab.Screen name="SearchScreen" component={SearchScreen} options={{
                title: "Rechercher",
                headerStyle: {
                    backgroundColor: '#ab0505',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                }
            }}/>
            <Tab.Screen name="MyTeamScreen" component={MyTeamScreen} options={{
                title: "Mon équipe",
                headerStyle: {
                    backgroundColor: '#ab0505',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                }
            }}/>
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} options={{
                title: "Paramètres",
                headerStyle: {
                    backgroundColor: '#ab0505',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                }
            }}/>
        </Tab.Navigator>
    );
}

export default TabsNavigation;