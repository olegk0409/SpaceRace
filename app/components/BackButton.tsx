import { useRouter } from 'expo-router'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{position: 'absolute', top: '10%', left: '5%', zIndex: 10}}>
      <Image
        source={require('@/assets/images/buttons/back.png')}
        style={{width: 40, height: 40}}
      />
    </TouchableOpacity>
  )
}

export default BackButton
