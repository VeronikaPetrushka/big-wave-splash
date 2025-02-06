// reward claim
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const Daily = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/microbes-title.png')} style={styles.title} />

            <View style={styles.card}>
                    <View style={styles.nameContainer}>
                        <Image source={require('../assets/microbes/1.png')} style={{width: 71, height: 67, resizeMode: 'contain', marginRight: 10}} />
                        <Text style={styles.name}>Deactivate Carlos</Text>
                    </View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                        <Text style={styles.reward}>Reward:</Text>
                        <Image source={require('../assets/decor/reward.png')} style={{width: 100, height: 42, resizeMode: 'contain'}} />
                    </View>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={''}
                        >
                        <Text style={styles.btnText}>Claim</Text>
                    </TouchableOpacity>
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

})


export default Daily;