//Libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

//Librairies propres au projet
import {getData, storeData} from "../utils/StorageService";
import {capitalize, formatPokemonId, getBackgroundColor, typeImages} from "../utils/Routines";

export default function PokemonDetails({route}) {
    const {id} = route.params;

    const [pokemon, setPokemon] = useState([]);
    const [pokemonSpecie, setPokemonSpecie] = useState([]);
    const [pokemonEvolution, setPokemonEvolution] = useState([]);
    const [pokemonEvolutionChainId, setPokemonEvolutionChainId] = useState();

    const [isPokemonInTeam, setIsPokemonInTeam] = useState();
    const [evolutions, setEvolutions] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [infoText, setInfoText] = useState("");

    const baseUrlPokemonImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const pokemonImage = `${baseUrlPokemonImage}${id}.png`;
    const [pokemonFirstEvolutionImage, setPokemonFirstEvolutionImage] = useState("");
    const [pokemonSecondEvolutionImage, setPokemonSecondEvolutionImage] = useState("");

    const getPokemon = async () => {
        // Fetch pokemon data
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(json => {
                    setPokemon(json)
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error)
        }
    }

    const getPokemonByName = async (pokemonName) => {
        // Fetch one pokemon data
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => response.json())
                .then(json => {
                    setPokemon(json)
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error)
        }
    }

    const getPokemonSpecie = async () => {
        //Fetch pokemon description data
        try {
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                .then(response => response.json())
                .then(json => {
                    setPokemonSpecie(json)
                    const evolutionChainId = json.evolution_chain.url.split("/")[6];
                    setPokemonEvolutionChainId(evolutionChainId)
                })
                .catch(error => console.error(error));
        } catch (error) {
            console.error(error)
        }
    }

    const getPokemonEvolutionChain = async () => {
        //Fetch pokemon evolution data
        try {
            const chainId = pokemonEvolutionChainId;
            if (chainId){
                fetch(`https://pokeapi.co/api/v2/evolution-chain/${chainId}`)
                    .then(response => response.json())
                    .then(json => {
                        setPokemonEvolution(json)
                    })
                    .catch(error => console.error(error));
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getPokemonEvolutions = async () => {
        try {
            if (pokemonEvolution){
                let evolutions = []
                if (pokemonEvolution.chain) {
                    const baseEvolutionName = pokemonEvolution.chain.species.name
                    if (pokemonEvolution.chain?.evolves_to.length > 0) {
                        const firstEvolutionName = pokemonEvolution.chain.evolves_to[0].species.name
                        if (firstEvolutionName !== pokemon.name) {
                            evolutions.push(firstEvolutionName)
                            setPokemonFirstEvolutionImage(`${baseUrlPokemonImage}${parseInt(id) + 1}.png`)
                            if (pokemonEvolution.chain.evolves_to[0].evolves_to.length > 0) {
                                const secondEvolutionName = pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name
                                if (secondEvolutionName !== pokemon.name) {
                                    evolutions.push(secondEvolutionName)
                                    setPokemonSecondEvolutionImage(`${baseUrlPokemonImage}${parseInt(id) + 2}.png`)
                                } else {
                                    evolutions = []
                                    setPokemonFirstEvolutionImage("")
                                    setPokemonSecondEvolutionImage("")
                                }
                            }
                        } else {
                            if (pokemonEvolution.chain.evolves_to[0].evolves_to.length > 0) {
                                const secondEvolutionName = pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name
                                evolutions.push(secondEvolutionName)
                                setPokemonFirstEvolutionImage(`${baseUrlPokemonImage}${parseInt(id) + 1}.png`)
                            }
                        }
                    }
                    setEvolutions(evolutions)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const checkIfInTeam = async () =>{
        try {
            const myTeam = await getData('myTeam')
            if(myTeam){
                const myTeamParsed = JSON.parse(myTeam)
                const isPokemonInTeam = myTeamParsed.map(p => p.id).includes(pokemon.id);
                setIsPokemonInTeam(isPokemonInTeam);
            }
        } catch (error) {

            console.error(error)
        }
    }

    const capturePokemon = async (pokemon) =>{
        try {
            const myTeam = await getData('myTeam')
            if(myTeam){
                const myTeamParsed = JSON.parse(myTeam)
                const isPokemonInTeam = myTeamParsed.map(p => p.id).includes(pokemon.id);
                setIsPokemonInTeam(isPokemonInTeam);

                if (isPokemonInTeam) {
                    const newTeam = myTeamParsed.filter(p => p.id !== pokemon.id)
                    await storeData('myTeam', JSON.stringify(newTeam))

                    setInfoText(capitalize(pokemon.name) + " à été relaché dans la nature...")
                    setShowInfo(true);
                    setTimeout(() => {
                        setShowInfo(false);
                    }, 2500);
                    setIsPokemonInTeam(false);
                    return
                } else {
                    if (myTeamParsed.length >= 6){
                        setInfoText("Impossible... votre équipe est déjà complète.")
                        setShowInfo(true);
                        setTimeout(() => {
                            setShowInfo(false);
                        }, 2500);
                        return
                    }

                    myTeamParsed.push(pokemon)
                    await storeData('myTeam', JSON.stringify(myTeamParsed))
                    setIsPokemonInTeam(true)

                    let teamSize = myTeamParsed.length
                    if(teamSize < 6) {
                        setInfoText(
                            "Nouvelle capture !" +
                            "\r" +
                            `Vous avez maintenant ${teamSize} pokémon dans votre équipe`
                        )
                        setShowInfo(true);
                        setTimeout(() => {
                            setShowInfo(false);
                        }, 2500);
                    } else {
                        setInfoText(
                            "Nouvelle capture !" +
                            "\r" +
                            "Votre équipe est maintenant complète."
                        )
                        setShowInfo(true);
                        setTimeout(() => {
                            setShowInfo(false);
                        }, 2500);
                    }
                }
            } else {
                await storeData('myTeam', JSON.stringify([pokemon]))
                setInfoText("Bravo ! Vous avez capturé votre premier pokémon !")
                setShowInfo(true);
                setTimeout(() => {
                    setShowInfo(false);
                }, 2500);
                setIsPokemonInTeam(true);
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getPokemon();
        getPokemonSpecie();
    }, []);

    useEffect(() => {
        getPokemonEvolutionChain();
    }, [pokemonEvolutionChainId]);

    useEffect(() => {
        getPokemonEvolutions();
    }, [pokemonEvolution]);

    useFocusEffect(
        () => {
            checkIfInTeam()
        });

    return (
        <ScrollView style={styles.scrollView}>
            {pokemon.name && pokemonSpecie.name && (
                <>
                <View style={styles.pokemonImageBox}>
                    <Image style={styles.image} source={{uri: pokemonImage}}/>
                    <View style={styles.captureBox}>
                        {isPokemonInTeam ? (
                            <>
                                <Image style={styles.captureImage} source={require('../assets/images/open-pokeball.png')}/>
                                <Button
                                    title="Relâcher"
                                    onPress={() => capturePokemon(pokemon)}
                                />
                            </>
                        ) : (
                            <>
                                <Image style={styles.captureImage} source={require('../assets/images/pokeball.png')}/>
                                <Button
                                    title="Capturer"
                                    onPress={() => capturePokemon(pokemon)}
                                />
                            </>
                        )}
                    </View>
                    {showInfo && (
                        <Text style={styles.captureInfo}>{infoText}</Text>
                    )}
                </View>
                <View style={styles.pokemonDetailsBox}>
                    <Text style={styles.pname}>{capitalize(pokemon.name)}</Text>
                    <Text style={styles.phash}>{formatPokemonId(pokemon.id)}</Text>
                    <View style={styles.typesBox}>
                        {pokemon.types.map((type, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.ptypesrow,
                                    { backgroundColor: getBackgroundColor(type.type.name) },
                                ]}
                            >
                                <Image
                                    style={styles.typeImage}
                                    source={typeImages[type.type.name]}
                                />
                                <Text style={styles.ptypes}>{capitalize(type.type.name)}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.pdescription}>{pokemonSpecie.flavor_text_entries[1].flavor_text.replace(/[\n\u000c]/g, ' ')}</Text>

                    <Text style={styles.caracTitle}>Caractéristiques :</Text>
                    <View style={styles.tabContainer}>
                        <View style={styles.tabRowL}>
                            <Image style={styles.tabImage} source={require('../assets/images/icon-kg.png')}/>
                            <Text style={styles.tabText}> {pokemon.weight / 10} kg</Text>
                        </View>
                        <View style={styles.tabRowR}>
                            <Image style={styles.tabImage} source={require('../assets/images/icon-taille.png')}/>
                            <Text style={styles.tabText}>{pokemon.height / 10} m</Text>
                        </View>
                    </View>

                    <Text style={styles.caracTitle}>Évolutions :</Text>
                    <View style={styles.evolutionsBox}>
                        {pokemonFirstEvolutionImage && evolutions ? (
                            <View style={styles.evolutionCard}>
                                <Image style={styles.evolutionImage} source={{uri: pokemonFirstEvolutionImage}}/>
                                <Text style={styles.evolutionName}>{capitalize(evolutions[0])}</Text>
                            </View>
                        ):(
                            <View>
                                <Text style={styles.noEvolution}>Aucune évolution</Text>
                            </View>
                        )}
                        {pokemonSecondEvolutionImage && evolutions && (
                            <View style={styles.evolutionCard}>
                                <Image style={styles.evolutionImage} source={{uri: pokemonSecondEvolutionImage}}/>
                                <Text style={styles.evolutionName}>{capitalize(evolutions[1])}</Text>
                            </View>
                    )}
                    </View>
                </View>
                </>
            )}
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    pokemonImageBox: {
        width: "100%",
        height: "30%",
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    image: {
        width: 175,
        height: 175,
        marginBottom: 20,
    },
    captureBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureImage: {
        width: 25,
        height: 25,
    },
    pokemonDetailsBox: {
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    pname:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    phash:{
        fontSize: 16,
        color: 'grey',
    },
    typesBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 10,
        gap: 10,
    },
    ptypes: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    typeImage: {
        width: 25,
        height: 25,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
    },
    ptypesrow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'lightgrey',
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    pdescription: {
        marginVertical: 10,
        fontSize: 16,
        color: 'black',
    },
    caracTitle: {
        marginVertical: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    tabContainer: {
        width: "70%",
        flexDirection: 'row',
        marginVertical: 10,
    },
    tabRowL: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        alignItems: 'center',
        width: "50%",
        borderWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 0.5,
        borderColor: 'black',
        padding: 5,
    },
    tabRowR: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        spaceBetween: 10,
        alignItems: 'center',
        width: "50%",
        borderWidth: 1,
        borderLeftWidth: 0.5,
        borderRightWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    tabImage: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
    tabText: {
        fontSize: 16,
        color: 'black',
    },
    captureInfo: {
        position: 'absolute',
        top: 0,
        textAlign: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
    },
    evolutionsBox: {
        height: 200,
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    evolutionCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#ffffff',

    },
    evolutionImage: {
        width: 150,
        height: 150,
    },
    evolutionName: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});