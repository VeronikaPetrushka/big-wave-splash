// styles + buttons
import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";
import microbes from "../constants/microbes";

const { height } = Dimensions.get('window');

const Levels = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/levels-title.png')} style={styles.title} />

            <ScrollView contentContainerStyle={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                {
                    microbes.map((item, index) => (
                        <View key={index} style={{width: '50%', alignItems: 'flex-start'}}>
                            <TouchableOpacity style={styles.card}>
                                {
                                    item.level === '1' && (
                                        <Image source={require('../assets/decor/levels/1.png')} style={{width: 30, height: 105, resizeMode: 'contain'}} />
                                    )
                                }
                                {
                                    item.level === '2' && (
                                        <Image source={require('../assets/decor/levels/2.png')} style={{width: 35, height: 105, resizeMode: 'contain'}} />
                                    )
                                }
                                {
                                    item.level === '3' && (
                                        <Image source={require('../assets/decor/levels/3.png')} style={{width: 35, height: 105, resizeMode: 'contain'}} />
                                    )
                                }
                                {
                                    item.level === '4' && (
                                        <Image source={require('../assets/decor/levels/4.png')} style={{width: 41, height: 105, resizeMode: 'contain'}} />
                                    )
                                }
                                {
                                    item.level === '5' && (
                                        <Image source={require('../assets/decor/levels/5.png')} style={{width: 35, height: 105, resizeMode: 'contain'}} />
                                    )
                                }
                                <View style={[styles.diffContainer, item.level === '5' && {backgroundColor: '#fc5b01', width: 170}]}>
                                    <Text style={styles.diff}>{item.complexity}</Text>
                                </View>
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
        width: 114, 
        borderRadius: 27,
        backgroundColor: '#fff',
        marginBottom: 24,
        shadowColor: '#84d2fe',
        shadowOffset: { width: -2, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        paddingHorizontal: 19,
        flexDirection: 'row'
    },

    diffContainer: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: '#84d2fe',
        borderRadius: 13,
        borderWidth: 5,
        borderColor: '#fff',
        minWidth: 102,
        height: 52,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 25
    },

    diff: {
        fontSize: 20,
        fontWeight: '900',
        color: '#2d2d2d',
        lineHeight: 26.2,
    }

})


export default Levels;