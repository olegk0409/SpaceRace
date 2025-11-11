import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, StatusBar, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from './components/modals/Settings';
import AbsoluteLeftButton from './components/AbsoluteLeftButton';


const Home = () => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const router = useRouter();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeContainer}>
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={'padding'}
      keyboardVerticalOffset={0} 
    >
      <StatusBar
        hidden={true}
        backgroundColor="#000"
        barStyle="light-content"
      />

        <ImageBackground 
          source={require('../assets/images/Preloader.png')}
          style={styles.background}
        >
          <View style={styles.container}>
            <AbsoluteLeftButton press={() => setIsSettingsVisible(true)} img={require('@/assets/images/buttons/settings.png')}/>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => router.replace('/game')} >
                <Image
                  source={require('@/assets/images/buttons/play.png')}
                  style={{width: 168, height: 60}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/shop')}>
                <Image
                  source={require('@/assets/images/buttons/shop.png')}
                  style={{width: 168, height: 60}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {isSettingsVisible && (
          <Settings width={screenWidth} height={screenHeight} setIsSettingsVisible={setIsSettingsVisible}/>
          )}
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardContainer: {
    flex: 1,
  },
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingLeft: '10%',
    paddingTop: '10%'
  },
  buttonsContainer: {
    gap: 20
  }
});

export default Home;