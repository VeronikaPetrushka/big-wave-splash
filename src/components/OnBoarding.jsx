import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 3);

        if(componentIndex === 2) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <LinearGradient
            colors={['#1de0d0', '#1d1568']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >

            {
                componentIndex === 0 && 
                <Image source={require('../assets/onboarding/1.png')} style={[styles.image, {marginTop: height * 0.07}]} />
            }
            {
                componentIndex === 1 && 
                <View style={{width: '100%', height: 371, alignItems: 'center', marginTop: height * 0.07}}>
                    <Image source={require('../assets/onboarding/2.png')} style={styles.image} />
                    <Image source={require('../assets/onboarding/hp.png')} style={{width: 103, height: 45, position: 'absolute', top: 66, right: 120, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/microbe-1.png')} style={{width: 70, height: 63, position: 'absolute', top: 130, right: 153, zIndex: 5}} />
                    <Image source={require('../assets/onboarding/splash-left.png')} style={{width: 105, height: 96, position: 'absolute', top: 102, right: 195, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/splash-right.png')} style={{width: 90, height: 116, position: 'absolute', top: 122, right: 86, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/splash.png')} style={{width: 70, height: 185, position: 'absolute', top: 204, right: 162, zIndex: 10}} />
                </View>
            }
            {
                componentIndex === 2 && 
                <View style={{width: '100%', height: 371, alignItems: 'center', marginTop: height * 0.07}}>
                    <Image source={require('../assets/onboarding/3.png')} style={styles.image} />
                    <Image source={require('../assets/onboarding/microbe-2.png')} style={{width: 57, height: 56, position: 'absolute', top: 110, right: 56, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/microbe-2.png')} style={{width: 57, height: 56, position: 'absolute', top: 170, right: 150, zIndex: 10, opacity: 0.7}} />
                    <Image source={require('../assets/onboarding/microbe-2.png')} style={{width: 57, height: 56, position: 'absolute', top: 247, right: 240, zIndex: 10, opacity: 0.5}} />
                    <Image source={require('../assets/onboarding/splash-left.png')} style={{width: 40, height: 46, position: 'absolute', top: 240, right: 295, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/splash-right.png')} style={{width: 40, height: 55, position: 'absolute', top: 295, right: 210, zIndex: 10}} />
                    <Image source={require('../assets/onboarding/splash.png')} style={{width: 27, height: 73, position: 'absolute', top: 303, right: 266, zIndex: 10}} />
                </View>
            }

            {
                componentIndex === 0 ? (
                    <Image source={require('../assets/onboarding/title/1.png')} style={styles.title} />
                ) : (
                    componentIndex === 1 ? (
                        <Image source={require('../assets/onboarding/title/2.png')} style={styles.title} />
                    ) : (
                        <Image source={require('../assets/onboarding/title/3.png')} style={styles.title} />
                    )
                )
            }

            <View style={styles.infoContainer}>

                <Text style={styles.text}>
                    {componentIndex === 2
                        ? 'Try to direct the splash so that it hits the target!' 
                        : 'Get ready for an exciting water splash game!'
                        }
                </Text>

                <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                    <Text style={styles.btnText}>{
                        componentIndex === 0 ? 'Next' : 
                        componentIndex === 1 ? 'Continue' :
                        'Start the game!'
                    }</Text>
                </TouchableOpacity>

            </View>

        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    image: {
        width: '90%',
        height: 370,
        resizeMode: 'contain',
    },

    infoContainer: {
        width: '100%',
        paddingHorizontal: 35,
    },

    title: {
        width: '80%',
        height: height * 0.1, 
        resizeMode: 'contain', 
        zIndex: 11,
        marginTop: 10,
        marginBottom: 20
    },

    text: {
        fontWeight: '900',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 24.4
    },

    btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#faf600',
        padding: height * 0.02,
        shadowColor: '#fc5b01',
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },

    btnText: {
        fontWeight: '900',
        fontSize: 24,
        color: '#000',
    },

})

export default OnBoarding;