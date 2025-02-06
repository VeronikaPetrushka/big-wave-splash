import { ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const MicrobeDetails = ({ item }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/back/1.png')} style={{flex: 1}}>
            <View style={styles.container}>

            <Image source={require('../assets/decor/microbes-title.png')} style={styles.title} />

            <ScrollView style={{width: '100%'}}>

                <View style={styles.card}>
                    <Image source={item.image} style={{width: 138, height: 120, resizeMode: 'contain', marginBottom: 5}} />
                    <Text style={[styles.cardName, {marginBottom: 8}]}>{item.name}</Text>
                    <View style={styles.diffContainer}>
                        <Text style={styles.diff}>{item.complexity}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.cardName, {fontSize: 16}]}>Health:  </Text>
                        <Text style={styles.value}>{item.health} HP</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.cardName, {fontSize: 16}]}>Time to deactivate:  </Text>
                        <Text style={styles.value}>{item.deactivate} Sec</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.cardName, {fontSize: 16}]}>Vulnerability:  </Text>
                        <Text style={styles.value}>{item.vulnerability}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.cardName, {fontSize: 16}]}>Teleportation:  </Text>
                        <Text style={styles.value}>{item.teleportation}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => navigation.goBack('')}
                        >
                        <Text style={styles.btnText}>Close</Text>
                    </TouchableOpacity>
                </View>   

            </ScrollView>

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
        marginTop: 28,
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
        shadowOffset: { width: -2, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 0,
        padding: 24,
    },

    cardName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        lineHeight: 39.3,
    },

    diffContainer: {
        paddingVertical: 3,
        paddingHorizontal: 24,
        backgroundColor: '#84d2fe',
        borderRadius: 7,
        marginBottom: 40
    },

    diff: {
        fontSize: 16,
        fontWeight: '900',
        color: '#0e407c',
        lineHeight: 26.2,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 12,
        flexWrap: 'wrap'
    },

    value: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0788e2',
        lineHeight: 39.3, 
        textAlign: 'center'
    }

})


export default MicrobeDetails;