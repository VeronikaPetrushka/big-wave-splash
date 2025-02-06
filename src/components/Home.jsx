import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/logo.png')} style={styles.logo} />

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('GameScreen')}>
                <Text style={styles.btnText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DailyScreen')}>
                <Text style={styles.btnText}>Daily quest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ShopScreen')}>
                <Text style={styles.btnText}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LevelsScreen')}>
                <Text style={styles.btnText}>Levels</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('MicrobesScreen')}>
                <Text style={styles.btnText}>Microbes</Text>
            </TouchableOpacity>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 29,
        paddingTop: height * 0.07
    },

    logo: {
        width: '100%',
        height: 232, 
        resizeMode: 'contain', 
        marginBottom: 22
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

})


export default Home;