import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import microbes from "../constants/microbes";

const { height } = Dimensions.get('window');

const Microbes = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/microbes-title.png')} style={styles.title} />

            <ScrollView style={{width: '100%'}}>
                {
                    microbes.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginBottom: 33}}>
                                <Image source={item.image} style={{width: 82, height: 76, marginRight: 15, resizeMode: 'contain'}} />
                                <View style={{width: '100%', alignItems: 'flex-start'}}>
                                    <Text style={styles.cardName}>{item.name}</Text>
                                    <View style={styles.diffContainer}>
                                        <Text style={styles.diff}>{item.complexity}</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.btn}
                                onPress={() => navigation.navigate('MicrobeDetailsScreen', {item: item})}
                                >
                                <Text style={styles.btnText}>Open info</Text>
                            </TouchableOpacity>
                        </View>    
                    ))
                }
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

    cardName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        lineHeight: 39.3,
        marginBottom: 4
    },

    diffContainer: {
        paddingVertical: 3,
        paddingHorizontal: 24,
        backgroundColor: '#84d2fe',
        borderRadius: 7,
    },

    diff: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 26.2,
    }

})


export default Microbes;