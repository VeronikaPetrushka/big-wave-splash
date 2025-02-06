import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView, Alert } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Shop = () => {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(0);
    const [increasedPowerPurchased, setIncreasedPowerPurchased] = useState(false);
    const [endlessWaterPurchased, setEndlessWaterPurchased] = useState(false);
  
    useEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('awards');
        setBalance(storedBalance ? parseInt(storedBalance, 10) : 0);
  
        const powerStatus = await AsyncStorage.getItem('increasedPower');
        const waterStatus = await AsyncStorage.getItem('endlessWater');
  
        setIncreasedPowerPurchased(powerStatus === 'true');
        setEndlessWaterPurchased(waterStatus === 'true');
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
  
    const handlePurchase = async (price, itemKey) => {
      if (balance < price) {
        Alert.alert("Not Enough Points", "You don't have enough points for this purchase.");
        return;
      }
  
      try {
        const updatedBalance = balance - price;
        await AsyncStorage.setItem('awards', String(updatedBalance));
        await AsyncStorage.setItem(itemKey, 'true');
        setBalance(updatedBalance);
  
        if (itemKey === 'increasedPower') setIncreasedPowerPurchased(true);
        if (itemKey === 'endlessWater') setEndlessWaterPurchased(true);
  
        Alert.alert("Purchase Successful", `You have successfully purchased ${itemKey.replace(/([A-Z])/g, ' $1')}.`);
      } catch (error) {
        console.error("Error processing purchase:", error);
      }
    };
  

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/shop-title.png')} style={styles.title} />

            <View style={styles.balanceContainer}>
                <Text style={styles.balance}>{balance}</Text>
                <Image source={require('../assets/decor/balance.png')} style={{width: 37, height: 37, marginLeft: 10}} />
            </View>

            <ScrollView style={{width: '100%'}}>

                <View style={styles.card}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>INCREASED POWER</Text>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.price}>Price:</Text>
                        <Image source={require('../assets/decor/shop/1.png')} style={{width: 110, height: 46, resizeMode: 'contain'}} />
                    </View>
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: balance >= 2300 ? '#faf600' : '#d3d3d3' }]}
                        onPress={() => handlePurchase(2300, 'increasedPower')}
                        disabled={balance < 2300}
                        >
                        <Text style={styles.btnText}>{increasedPowerPurchased ? 'Applied' : 'Exchange'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>ENDLESS WATER</Text>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.price}>Price:</Text>
                        <Image source={require('../assets/decor/shop/2.png')} style={{width: 130, height: 46, resizeMode: 'contain'}} />
                    </View>
                    <TouchableOpacity 
                        style={[styles.btn, { backgroundColor: balance >= 25000 ? '#faf600' : '#d3d3d3' }]}
                        onPress={() => handlePurchase(25000, 'endlessWater')}
                        disabled={balance < 25000}
                        >
                        <Text style={styles.btnText}>{endlessWaterPurchased ? 'Applied' : 'Exchange'}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

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
        marginBottom: 33
    },

    balanceContainer: {
        paddingVertical: 6,
        paddingHorizontal: 30,
        backgroundColor: '#fff',
        borderRadius: 7,
        borderWidth: 5,
        borderColor: '#84d2fe',
        marginBottom: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },

    balance: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 26.2,
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
        marginBottom: 15
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
        alignItems: 'center'
    },

    name: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 26.2,
    },

    price: {
        fontSize: 16,
        fontWeight: '900',
        color: '#242136',
        lineHeight: 26.2,
    },

})


export default Shop;