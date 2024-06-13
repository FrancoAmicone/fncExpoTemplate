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
    const loadAd = () => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setAdLoaded(true);
      });

      interstitial.load();

      // Unsubscribe from events on unmount
      return unsubscribe;
    };

    const unsubscribe = loadAd();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const showInterstitialAd = () => {
    if (adLoaded) {
      interstitial.show();
      setAdLoaded(false);
      interstitial.load(); // Reload the ad for the next show
    } else {
      console.log('Ad not loaded yet.');
    }
  };

  // If fonts or ads are not loaded, return null or a loading component
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>(҂◡̀_◡́)ᕤ FNCMICN 2024. {"\n"}Welcome back mi próximo yo!</Text>
      <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      <TouchableOpacity 
        style={styles.buttonAds}
        onPress={showInterstitialAd}
      >
        <Text style={styles.buttonText}>Show Interstitial</Text>
      </TouchableOpacity>
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
    fontFamily: "Neue",
    textAlign: 'center',
  },
  buttonAds: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
