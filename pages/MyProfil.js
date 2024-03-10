//Libraries
import {useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import {Camera} from "expo-camera";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
    PixelRatio,
    StatusBar,
    Modal,
    TextInput
} from 'react-native';

//Libraries propres au projet
import {storeData, removeData, getData} from "../utils/StorageService";

export default function Settings({}) {
    const [profilePicture, setProfilePicture] = useState(null);

    const [cameraRef, setCameraRef] = useState(null);
    const [isCameraModalVisible, setCameraModalVisible] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

    const [username, setUsername] = useState("Username");
    const [newUsername, setNewUsername] = useState('');
    const [isEditingUsername, setIsEditingUsername] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            try{
                setProfilePicture(result.assets[0].uri);
                await storeData('profilePicture', result.assets[0].uri);
            } catch (error){
                console.log(error);
            }
        }
    };

    const takePicture = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
                return;
            }

            if (cameraRef) {
                const photo = await cameraRef.takePictureAsync();
                if (photo) {
                    setProfilePicture(photo.uri);
                    await storeData('profilePicture', photo.uri);
                    closeCameraModal();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProfilePicture = async () => {
        try{
            setProfilePicture(null);
            await removeData('profilePicture');
        } catch (error){
            console.log(error);
        }
    }

    const toggleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
        );
    };

    const openCameraModal = () => {
        setCameraModalVisible(true);
    };

    const closeCameraModal = () => {
        setCameraModalVisible(false);
    };

    const startEditingUsername = () => {
        setIsEditingUsername(true);
    };

    const saveUsername = async () => {
        try{
            setUsername(newUsername);
            setNewUsername(newUsername);
            setIsEditingUsername(false);
            await storeData('username', newUsername);
        } catch (error){
            console.log(error);
        }
    };

    const cancelEdition = () => {
        setNewUsername(username);
        setIsEditingUsername(false);
    }

    useEffect(() => {
        getData('username').then((storedUsername) => {
            if (storedUsername) {
                setNewUsername(storedUsername);
            }
        });
    }, []);

    useFocusEffect(() => {
        getData('profilePicture').then((profilePicture) => {
            if (profilePicture) {
                setProfilePicture(profilePicture)
            }
        });

        getData('username').then((storedUsername) => {
            if (storedUsername) {
                setUsername(storedUsername);
            }
        });
    });

    return (
        <View style={styles.pageContainer}>
            <View style={styles.visualisationBox}>
                <View>
                    {profilePicture ? (
                        <Image source={{uri: profilePicture}} style={styles.profileImage} />
                    ):(
                        <Image source={require('../assets/images/icon-default-user.png')} style={styles.profileImage} />
                    )}
                </View>
                <View style={styles.formBox}>
                    {isEditingUsername ? (
                        <View style={styles.formEditDouble}>
                            <TextInput
                                value={newUsername}
                                style={styles.usernameInput}
                                onChangeText={(text) => setNewUsername(text)}
                            />
                            <View style={styles.formIsEditint}>
                                <TouchableOpacity onPress={saveUsername}>
                                    <Image source={require('../assets/images/icon-save.png')} style={styles.formIcons} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={cancelEdition}>
                                   <Image source={require('../assets/images/icon-cancel.png')} style={styles.formIcons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.formEdit}>
                            <Text style={styles.username}>{username}</Text>
                            <TouchableOpacity onPress={startEditingUsername}>
                                <Image source={require('../assets/images/icon-edit.png')} style={styles.formIcons}/>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </View>
            <View style={styles.profilePictureActionsBox}>
                <View style={styles.profilePictureActionsBoxChild}>
                    <TouchableOpacity style={styles.pictureBtn} onPress={pickImage}>
                        <Text style={styles.pictureBtnText}>Upload an image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pictureBtn} onPress={openCameraModal}>
                        <Text style={styles.pictureBtnText}>Take a picture</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.pictureBtnDelete} onPress={deleteProfilePicture}>
                    <Text style={styles.pictureBtnTextDelete}>Delete my profile picture</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={isCameraModalVisible}
            >
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={(ref) => setCameraRef(ref)}
                        style={styles.camera}
                        type={cameraType}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 100, paddingBottom: 30}}>
                        <TouchableOpacity onPress={toggleCameraType} style={styles.cameraBtn}>
                            <Image source={require('../assets/images/switch-camera.png')} style={styles.systemCameraBtn}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePicture} style={styles.cameraBtn}>
                            <Image source={require('../assets/images/take-picture.png')} style={styles.systemCameraBtn}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeCameraModal} style={styles.cameraBtn}>
                            <Image source={require('../assets/images/close.png')} style={styles.systemCameraBtn}/>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        marginHorizontal: 10,
        marginVertical: 20,
    },
    visualisationBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 25,
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 100,
        objectFit: 'contain',
        borderWidth: 2,
        borderColor: 'grey',
    },
    formBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    profilePictureActionsBox: {
        paddingHorizontal: 10,
        marginVertical: 30,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
    },
    profilePictureActionsBoxChild: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pictureBtn: {
        backgroundColor: '#e1e1e1',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 50,
    },
    pictureBtnText: {
        color: 'blue',
        fontSize: 18,
    },
    pictureBtnDelete: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    pictureBtnTextDelete: {
        color: 'white',
        fontSize: 18,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
        width: '100%',
    },
    cameraBtn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 15,
    },
    cameraBtnText: {
        fontSize: 18,
        color: 'blue',
    },
    cameraBtnText2: {
        fontSize: 18,
        color: 'blue',
        marginBottom: 20,
    },
    usernameInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        fontSize: 24,
        marginTop: 5,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    formEdit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    formEditDouble: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15,
    },
    formIcons: {
        width: 25,
        height: 25,
    },
    formIsEditint: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    systemCameraBtn: {
        width: 50,
        height: 50,
    },
});
