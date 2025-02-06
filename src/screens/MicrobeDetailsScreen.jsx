import { View } from "react-native"
import MicrobeDetails from "../components/MicrobeDetails"

const MicrobeDetailsScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <MicrobeDetails item={item} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default MicrobeDetailsScreen;