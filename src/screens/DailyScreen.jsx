import { View } from "react-native"
import Daily from "../components/Daily"

const DailyScreen = () => {
    return (
        <View style={styles.container}>
            <Daily />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default DailyScreen;