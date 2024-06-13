import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import { useFonts } from 'expo-font';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

export default function App() {
  const [fontsLoaded] = useFonts({
    Neue: require("./assets/fonts/NeueMontreal-Medium.otf"),
    // add extra fonts here
  });

  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setAdLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => unsubscribe();
  }, []);

  // If fonts or ads are not loaded, return null or a loading component
  if (!fontsLoaded || !adLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>(҂◡̀_◡́)ᕤ FNCMICN 2024. {"\n"}Welcome back mi próximo yo!</Text>
      
      <TouchableOpacity 
        style={styles.buttonAds}
        onPress={() => {
          interstitial.show();
        }}
      >
        <Text style={styles.buttonText}>Show Interstitial</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
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
    fontFamily: "Neue",
    textAlign: 'center',
  },
  buttonAds: {
    margin: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "Neue",

    textAlign: 'center',
  },
});
