import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Daily = () => {
    const navigation = useNavigation();
    const [claimEnabled, setClaimEnabled] = useState(false);
    const [timerText, setTimerText] = useState("");
  
    useEffect(() => {
      checkCompletionFlag();
    }, []);
  
    const checkCompletionFlag = async () => {
      try {
        const flagData = await AsyncStorage.getItem('microbeCompletionFlag');
        if (flagData) {
          const { expirationTime } = JSON.parse(flagData);
          const remainingTime = expirationTime - new Date().getTime();
          if (remainingTime > 0) {
            setClaimEnabled(false);
            startCountdown(remainingTime);
          } else {
            await AsyncStorage.removeItem('microbeCompletionFlag');
            setClaimEnabled(true);
          }
        } else {
          setClaimEnabled(true);
        }
      } catch (error) {
        console.error("Error checking completion flag:", error);
      }
    };
  
    const startCountdown = (remainingTime) => {
      const interval = setInterval(() => {
        const secondsLeft = Math.max(0, Math.floor(remainingTime / 1000));
        if (secondsLeft <= 0) {
          clearInterval(interval);
          setTimerText("");
          setClaimEnabled(true);
        } else {
          const hours = Math.floor(secondsLeft / 3600);
          const minutes = Math.floor((secondsLeft % 3600) / 60);
          const seconds = secondsLeft % 60;
          setTimerText(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
        remainingTime -= 1000;
      }, 1000);
    };
  
    const handleClaimReward = async () => {
      try {
        const reward = 150;
        const existingAwards = await AsyncStorage.getItem('awards');
        const currentTotal = existingAwards ? parseInt(existingAwards, 10) : 0;
        const updatedTotal = currentTotal + reward;
        await AsyncStorage.setItem('awards', String(updatedTotal));
  
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        const flagData = JSON.stringify({ award: 'completed', expirationTime });
        await AsyncStorage.setItem('microbeCompletionFlag', flagData);
  
        Alert.alert("Success", "Reward claimed!");
        setClaimEnabled(false);
        startCountdown(24 * 60 * 60 * 1000);
      } catch (error) {
        console.error("Error claiming reward:", error);
      }
    };

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/microbes-title.png')} style={styles.title} />

            <View style={styles.card}>
                {
                    claimEnabled ? (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <View style={styles.nameContainer}>
                                <Image source={require('../assets/microbes/1.png')} style={{width: 71, height: 67, resizeMode: 'contain', marginRight: 10}} />
                                <Text style={styles.name}>Deactivate Carlos</Text>
                            </View>
                            <View style={{width: '100%', height: 170, marginTop: -60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                                <Text style={styles.reward}>Reward:</Text>
                                <Image source={require('../assets/decor/reward.png')} style={{width: 100, height: 42, resizeMode: 'contain'}} />
                            </View>
                            <TouchableOpacity 
                                style={[styles.btn, { backgroundColor: claimEnabled ? '#faf600' : '#d3d3d3' }]}
                                onPress={handleClaimReward}
                                disabled={!claimEnabled}
                                >
                                <Text style={styles.btnText}>Claim</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Image source={require('../assets/decor/fish.png')} style={{width: 205, height: 118, resizeMode: 'contain', marginBottom: 5}} />
                            <Text style={styles.completedText}>You have completed the amazing quest. Turn through:</Text>
                            <Text style={styles.timer}>{timerText}</Text>
                        </View>
                    )
                }
                </View>

            <TouchableOpacity 
                style={[styles.btn, {marginTop: 20}]}
                onPress={() => navigation.goBack('')}
                >
                <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: height * 0.07
    },

    title: {
        width: '100%',
        height: 75, 
        resizeMode: 'contain', 
        marginBottom: 40
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
        marginBottom: 15,
        position: 'absolute',
        bottom: 20
    },

    btnText: {
        fontWeight: '900',
        fontSize: 24,
        color: '#000',
    },

    card: {
        width: '100%', 
        alignItems: 'center',
        borderRadius: 27,
        backgroundColor: '#fff',
        marginBottom: 24,
        shadowColor: '#84d2fe',
        shadowOffset: { width: -2, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        padding: 24,
    },

    nameContainer: {
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: '#84d2fe',
        borderRadius: 17,
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    name: {
        fontSize: 17,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 26.2,
    },

    reward: {
        fontSize: 16,
        fontWeight: '900',
        color: '#242136',
        lineHeight: 26.2,
    },

    completedText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#494d55',
        lineHeight: 39.3,
        marginBottom: 16,
        textAlign: 'center'
    },

    timer: {
        fontSize: 44,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 78.62,
    },

})


export default Daily;