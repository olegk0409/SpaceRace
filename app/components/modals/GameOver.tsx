import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const aspect = 685 / 410

const GameOver = ({width, height, coins, setIsGameOver}) => {
  const router = useRouter();
  const handleRestart = () => {
    setIsGameOver(false)
  }

  return (
    <BlurView intensity={100} tint='dark' style={{position: 'absolute', top: 0, right: 0, width: width, height: height, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={require('@/assets/images/modals/Pause.png')}
        style={{width: height * 0.8, height: height * 0.8, alignItems: 'center', gap: 6, zIndex: 10}}
      >
        <Text style={{fontFamily: 'HS', fontSize: 24, color: '#FFF', marginTop: '14%'}}>Game Over</Text>
        <Text style={{fontFamily: 'HS', fontSize: 16, color: '#FFF', marginTop: '10%'}}>Total Coins collected</Text>

        <View style={{marginTop: '2%'}}>
          <ImageBackground
            source={require('@/assets/images/money-indicator.png')}
            style={{width: 102, height: 37, justifyContent: 'center', alignItems: 'center'}}
          >
            <Text style={{transform: [{translateX: '30%'}], fontFamily: 'HS', fontSize: 12, color: '#fff', textAlign: 'center'}}>{coins || 0}</Text>
          </ImageBackground>
        </View>

        <View style={{flexDirection: 'row', marginTop: '2.5%', gap: 15}}>
          <TouchableOpacity onPress={() => router.replace('/home')}>
            <Image
              source={require('@/assets/images/buttons/home.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRestart}>
            <Image
              source={require('@/assets/images/buttons/restart.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Image
        source={require('@/assets/images/rocket-gg.png')}
        style={{width: height * aspect, height: height, position: 'absolute', left: '15%', bottom: '0%'}}
      />
    </BlurView>
  )
}

export default GameOver
