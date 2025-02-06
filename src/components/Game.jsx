import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import microbes from "../constants/microbes";

const { height, width } = Dimensions.get('window');

const Game = () => {
  const navigation = useNavigation();
  const [microbeIndex, setMicrobeIndex] = useState(0);
  const [microbe, setMicrobe] = useState(microbes[microbeIndex]);
  const [health, setHealth] = useState(microbe.health);
  const [showSplash, setShowSplash] = useState(false);
  const position = new Animated.ValueXY({ x: width * 0.3, y: height * 0.4 });
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [powerStatus, setPowerStatus] = useState(false);

  useEffect(() => {
    const fetchPowerStatus = async () => {
      try {
        const powerData = await AsyncStorage.getItem('increasedPower');
        setPowerStatus(powerData === 'true');
      } catch (error) {
        console.error("Error retrieving increasedPower status:", error);
      }
    };

    fetchPowerStatus();
  }, []);

  useEffect(() => {
    checkCompletionFlag();
  }, []);  

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && health > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else {
      setGameOver(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, health]);
  
  
  useEffect(() => {
    const moveMicrobe = () => {
      Animated.timing(position, {
        toValue: {
          x: Math.random() * (width - 100),
          y: Math.random() * (height - 200),
        },
        duration: 1500 + Math.random() * 1500,
        useNativeDriver: false,
      }).start(() => {
        if (health > 0) moveMicrobe();
      });
    };

    moveMicrobe();
  }, [health]);

  const handlePressIn = () => {
    setShowSplash(true);
  };

  const handlePressOut = () => {
    setShowSplash(false);
  };

  const handleMicrobePress = () => {
    setHealth((prevHealth) => Math.max(prevHealth - (powerStatus ? 30 : 10), 0));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const saveAward = async (award) => {
    try {
      const existingAwards = await AsyncStorage.getItem('awards');
      const currentTotal = existingAwards ? parseInt(existingAwards, 10) : 0;
      const updatedTotal = currentTotal + award;
      await AsyncStorage.setItem('awards', String(updatedTotal));
    } catch (error) {
      console.error("Error saving award:", error);
    }
  };  

  useEffect(() => {
    if (health === 0 && gameOver) {
      const award = async () => {
        await saveAward(microbe.award);
      };
      award();
    }
  }, [health, gameOver]);

  const storeCompletionFlag = async () => {
    try {
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      const flagData = JSON.stringify({ award: 'completed', expirationTime });
      await AsyncStorage.setItem('microbeCompletionFlag', flagData);
    } catch (error) {
      console.error("Error storing completion flag:", error);
    }
  };
  
  const checkCompletionFlag = async () => {
    try {
      const flagData = await AsyncStorage.getItem('microbeCompletionFlag');
      if (flagData) {
        const { expirationTime } = JSON.parse(flagData);
        if (new Date().getTime() > expirationTime) {
          await AsyncStorage.removeItem('microbeCompletionFlag');
        }
      }
    } catch (error) {
      console.error("Error checking completion flag:", error);
    }
  };  

  useEffect(() => {
    if (health === 0 && microbeIndex === 0) {
      const handleAwardCompletion = async () => {
        await storeCompletionFlag();
      };
      handleAwardCompletion();
    }
  }, [health, microbeIndex]);  
  
  const handleTryAgain = () => {
    setTimeLeft(20);
    setHealth(microbe.health);
    setGameOver(false);
  };

  const handleNextLevel = () => {
    const nextMicrobeIndex = microbeIndex + 1;
    if (nextMicrobeIndex < microbes.length) {
      setMicrobeIndex(nextMicrobeIndex);
      setMicrobe(microbes[nextMicrobeIndex]);
      setHealth(microbes[nextMicrobeIndex].health);
      setTimeLeft(20);
      setGameOver(false);
    } else {
      alert('Congratulations! All levels completed.');
      navigation.goBack();
    }
  };

  const handleRestartGame = () => {
    setMicrobeIndex(0);
    setMicrobe(microbes[0]);
    setHealth(microbes[0].health);
    setTimeLeft(20);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <ImageBackground source={microbe.background} style={{ flex: 1 }}>
        <View style={styles.container}>
          {health > 0 ? (
            <View style={{width: '100%', alignItems: 'center'}}>
                <Image source={require('../assets/game/gameover-title.png')} style={styles.title} />
                <View style={styles.finishContainer}>
                <Text style={[styles.finishLevel, {marginTop: height * 0.066}]}>Level {microbe.level}</Text>
                <Text style={[styles.finishLevel, {marginBottom: 12}]}>not passed</Text>
                <Text style={styles.finishText}>Time is up</Text>
                <TouchableOpacity style={styles.btn} onPress={handleTryAgain}>
                        <Text style={styles.btnText}>Try Again</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack('')}>
                    <Text style={styles.homeBtnText}>BACK HOME</Text>
                </TouchableOpacity>
                <Image source={require('../assets/game/man.png')} style={styles.man} />
            </View>
            </View>
          ) : (
            <View style={{width: '100%', alignItems: 'center'}}>
                <Image source={require('../assets/game/success-title.png')} style={styles.title} />
                <View style={styles.finishContainer}>
                    <View style={[styles.successMicrobeContainer, {marginTop: 30}]}>
                        <Image source={microbe.image} style={{width: 150, height: 140, resizeMode: 'contain'}} />
                    </View>
                    <Text style={styles.finishLevel}>Level {microbe.level}!</Text>
                    <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: height * 0.032}}>
                        <Text style={[styles.finishText, {marginBottom: 0}]}>Award:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.finishText, {marginBottom: 0}]}>{microbe.award}</Text>
                          <Image source={require('../assets/decor/balance.png')} style={{width: 30, height: 30, marginLeft: 10}} />
                        </View>
                    </View>
                    {
                        microbe.level === '5' && (
                            <Text style={[styles.finishText, {marginBottom: height * 0.04, textAlign: 'center', fontSize: 16, lineHeight: 26, marginTop: -20}]}>The end is over, all microbes have learned the damage! You can start a new game</Text>
                        )
                    }
                    {
                        microbe.level === '5' ? (
                            <TouchableOpacity style={styles.btn} onPress={handleRestartGame}>
                                <Text style={styles.btnText}>START OVER AGAIN!</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.btn} onPress={handleNextLevel}>
                                <Text style={styles.btnText}>Next Level</Text>
                            </TouchableOpacity>    
                        )
                    }
                    <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.goBack('')}>
                        <Text style={styles.homeBtnText}>BACK HOME</Text>
                    </TouchableOpacity>
                    <Image source={require('../assets/game/fish.png')} style={styles.fish} />
                    <Image source={require('../assets/game/man.png')} style={styles.man} />
                </View>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={microbe.background} style={{ flex: 1 }}>
      <View style={styles.container}>

        <Image source={microbe.levelTitle} style={styles.title} />

        <View style={[styles.textContainer, {zIndex: 5}]}>
          <Text style={styles.text}>Don't let the germ escape!</Text>
        </View>
        <View style={[styles.textContainer, {paddingVertical: 10, marginTop: -10}]}>
            <Text style={styles.text}>Time: {formatTime(timeLeft)}</Text>
        </View>


        <Animated.View style={[position.getLayout(), styles.microbeContainer]}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleMicrobePress}
            >
                <View>
                    <Image source={microbe.image} style={styles.microbe} />
                    <View style={styles.healthBar}>
                        <View style={[styles.healthFill, { width: `${(health / microbe.health) * 70}` }]} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>

        {showSplash && (
            <Image source={require('../assets/game/splash.png')} style={styles.splash} />
        )}

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: height * 0.07,
  },

  title: {
    width: '100%',
    height: 75,
    resizeMode: 'contain',
    zIndex: 10,
  },

  textContainer: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#fff',
    borderWidth: 5,
    borderColor: '#098aee',
    marginTop: -20,
  },

  text: {
    fontSize: 15,
    fontWeight: '800',
    color: '#494d55',
    lineHeight: 22.4,
  },

  microbeContainer: {
    position: 'absolute',
    zIndex: 12
  },

  microbe: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  splash: {
    width: 253,
    height: 440,
    position: 'absolute',
    bottom: 0,
    left: -20,
    resizeMode: 'contain',
  },

  healthBar: {
    height: 19,
    backgroundColor: '#fff',
    width: 70,
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#494d55',
    overflow: 'hidden'
  },

  healthFill: {
    height: '100%',
    backgroundColor: '#32CD32',
    borderRadius: 12,
  },

  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#faf600',
    padding: 20,
    shadowColor: '#fc5b01',
    shadowOffset: { width: -4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 5
    },

    btnText: {
        fontWeight: '900',
        fontSize: 24,
        color: '#000',
        textAlign: 'center'
    },

    finishContainer: {
        width: '90%', 
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#fff',
        marginBottom: 24,
        borderWidth: 5,
        borderColor: '#84d2fe',
        padding: 23,
        paddingBottom: 0,
        alignItems: 'center',
        marginTop: -30
    },

    finishLevel: {
        fontSize: 36,
        fontWeight: '800',
        color: '#242136',
        lineHeight: 59,   
    },

    finishText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#494d55',
        lineHeight: 32.76,
        marginBottom: height * 0.066
    },

    man: {
        width: 150,
        height: 286,
        resizeMode: 'contain',
        position: 'absolute',
        right: -43,
        top: -20,
        zIndex: 13
    },

    fish: {
        width: 100,
        height: 141,
        resizeMode: 'contain',
        position: 'absolute',
        left: -43,
        top: 30,
        zIndex: 13
    },

    successMicrobeContainer: {
        width: '100%',
        borderRadius: 17,
        backgroundColor: '#84d2fe',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        padding: 20
    },

    homeBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    homeBtnText: {
        fontWeight: '900',
        fontSize: 20,
        color: '#565656',
        lineHeight: 32.76
    }


});

export default Game;
