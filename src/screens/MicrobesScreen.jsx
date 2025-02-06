import { View } from "react-native"
import Microbes from "../components/Microbes"

const MicrobesScreen = () => {
    return (
        <View style={styles.container}>
            <Microbes />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MicrobesScreen;