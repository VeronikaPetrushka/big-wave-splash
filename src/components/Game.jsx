import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
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
    setHealth((prevHealth) => Math.max(prevHealth - 10, 0));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

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

  if (gameOver) {
    return (
      <ImageBackground source={microbe.background} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={[styles.text, { fontSize: 22, marginBottom: 20 }]}>Game Over!</Text>
          <Text style={[styles.text, { fontSize: 18, marginBottom: 20 }]}>Final Health: {health}</Text>
          {health === 0 ? (
            <TouchableOpacity style={styles.btn} onPress={handleNextLevel}>
              <Text style={styles.btnText}>Next Level</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btn} onPress={handleTryAgain}>
                <Text style={styles.btnText}>Try Again</Text>
            </TouchableOpacity>
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
                        <View style={[styles.healthFill, { width: `${(health / microbe.health) * 130}` }]} />
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
    height: 10,
    backgroundColor: '#ddd',
    width: 130,
    borderRadius: 5,
    marginTop: 5,
  },

  healthFill: {
    height: '100%',
    backgroundColor: '#32CD32',
    borderRadius: 5,
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
    marginBottom: 15
    },

    btnText: {
        fontWeight: '900',
        fontSize: 24,
        color: '#000',
    },


});

export default Game;
