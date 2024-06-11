import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useFonts } from 'expo-font';




export default function App() {
  const  [fontsLoaded] = useFonts({
    Neue: require("./assets/fonts/NeueMontreal-Medium.otf")
    //add extra fonts//

  });

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>(҂◡̀_◡́)ᕤ  FNCMICN 2024.  {"\n"}
        Welcome back mi proximo yo! 
      </Text>
  
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />


<StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 30,
    fontFamily:"Neue",
    textAlign: 'center',
  }
});
