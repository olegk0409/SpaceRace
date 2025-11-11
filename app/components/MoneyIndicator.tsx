import { useRouter } from 'expo-router'
import React from 'react'
import { ImageBackground, Text, TouchableOpacity } from 'react-native'

const MoneyIndicator = ({coins}) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', top: '10%', right: '5%'}}>
      <ImageBackground
        source={require('@/assets/images/money-indicator.png')}
        style={{width: 102, height: 37, justifyContent: 'center',}}
      >
        <Text style={{marginLeft: '40%', fontFamily: 'HS', color: '#fff', fontSize: 12}}>{coins}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default MoneyIndicator;
