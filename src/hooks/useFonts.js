import * as Font from "expo-font";

export default useFonts = async () =>
    await Font.loadAsync({
        "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
        "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
        "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
        "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    });
    