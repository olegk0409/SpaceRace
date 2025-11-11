import { loadDashboardItemsToVar, saveDashboardItems } from '@/utills/functions';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import AbsoluteLeftButton from '../AbsoluteLeftButton';
import AbsoluteRightButton from '../AbsoluteRightButton';
import { useRouter } from 'expo-router';


const Settings = ({width, height, setIsSettingsVisible}) => {
  const [volume, setVolume] = useState(null);
  const [sound, setSound] = useState(null);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    const getVolume = async () => {
      const vol = await loadDashboardItemsToVar('volume');
      const son = await loadDashboardItemsToVar('sound');
      setVolume(typeof vol === 'number' ? vol : 0);
      setSound(typeof son === 'number' ? son : 0);
    }
    getVolume();
  }, [])

  useEffect(() => {
    const saveMusicVolume = async () => {
      if (volume !== null) {
        saveDashboardItems('volume', volume)
      }
    }
    saveMusicVolume();
  }, [volume]);

  useEffect(() => {
    const saveSoundVolume = async () => {
      if (sound !== null) {
        saveDashboardItems('sound', sound)
      }
    }
    saveSoundVolume();
  }, [sound]);

  if (isWebViewVisible) {
    return (
      <View style={{width: width, height: height, position: 'relative',}}>
        <TouchableOpacity onPress={() => setIsWebViewVisible(false)}
          style={{position: 'absolute', top: '2.5%', right: '6%', zIndex: 10, width: 60, height: 35,
          backgroundColor: '#1B1B1B', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
        >
          <Text style={{color: 'white'}}>Close</Text>
        </TouchableOpacity>

        <View style={{flex: 1, backgroundColor: 'white', paddingTop: '5%'}}>
          <WebView
          source={{ uri: 'https://github.com/olegk0409' }}
          style={{ flex: 1, }}
        />
        </View>
      </View>
    );
  }

  return (
    <BlurView intensity={100} tint='dark' style={{position: 'absolute', top: 0, right: 0, width: width, height: height, alignItems: 'center', justifyContent: 'center'}}>

      <AbsoluteLeftButton press={() => setIsSettingsVisible(false)} img={require('@/assets/images/buttons/back.png')}/>
      <AbsoluteRightButton press={() => router.push('/onboarding')} img={require('@/assets/images/buttons/question.png')}/>


      <ImageBackground
        source={require('@/assets/images/modals/Pause.png')}
        style={{width: screenHeight * 0.7, height: screenHeight * 0.7, alignItems: 'center',}}
      >
        <View style={{flexDirection: 'row', marginTop: '10%', gap: 10, alignItems: 'center'}}>
          <FontAwesome name="volume-up" size={32} color="white" />
          <Slider
            style={{width: '50%'}}
            minimumValue={0}
            maximumValue={1}
            value={volume || 0}
            onValueChange={val => setVolume(val)}
            minimumTrackTintColor="#3DCC6A"
            maximumTrackTintColor="#858585"
            thumbTintColor="#31AC5C"
          />
        </View>

        <View style={{flexDirection: 'row', marginTop: '10%', gap: 10, alignItems: 'center'}}>
          <FontAwesome name="music" size={32} color="white" />
          <Slider
            style={{width: '50%'}}
            minimumValue={0}
            maximumValue={1}
            value={sound || 0}
            onValueChange={s => setSound(s)}
            minimumTrackTintColor="#3DCC6A"
            maximumTrackTintColor="#858585"
            thumbTintColor="#31AC5C"
          />
        </View>

        <View style={{marginTop: '15%', gap: 10}}>
          <TouchableOpacity onPress={() => setIsWebViewVisible(true)}>
            <Text style={{fontFamily: 'HS', fontSize: 20, color: '#FFF', textAlign: 'center', textDecorationLine: 'underline'}}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsWebViewVisible(true)}>
            <Text style={{fontFamily: 'HS', fontSize: 20, color: '#FFF', textAlign: 'center', textDecorationLine: 'underline'}}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </BlurView>
  )
}

export default Settings;
