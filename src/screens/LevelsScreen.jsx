import { View } from "react-native"
import Levels from "../components/Levels"

const LevelsScreen = () => {
    return (
        <View style={styles.container}>
            <Levels />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default LevelsScreen;