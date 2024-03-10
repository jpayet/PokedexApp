import {StatusBar} from 'expo-status-bar';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Settings({navigation}) {
    return (
        <ScrollView style={styles.pageContainer}>
            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('MyProfilScreen')}>
                    <Text style={styles.rowTitle}>Mon Profil</Text>
                    <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowContainer} onPress={() => navigation.navigate('AppAppearenceScreen')}>
                <Text style={styles.rowTitle}>Apparence de l'application</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </TouchableOpacity>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Notifications</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Langue et région</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Gestion des données</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Aide et support</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Informations de version</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <View style={styles.rowContainerUnclickable}>
                <Text style={styles.rowTitle}>Licence et informations légales</Text>
                <Image style={styles.rowImage} source={require('../assets/images/icon-arrow-right.png')}/>
            </View>
            <StatusBar style="auto" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        margin: 10,
    },
    pageName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionContainer: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rowContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
    },
    rowContainerUnclickable : {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        backgroundColor: '#d3d3d3',
        marginBottom: 10,
        opacity: 0.5,
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowImage: {
        width: 40,
        height: 40,
    },
});
