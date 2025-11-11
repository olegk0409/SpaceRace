import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const AbsoluteRightButton = ({img, press}) => {

  return (
    <TouchableOpacity onPress={press} style={{position: 'absolute', top: '10%', right: '5%'}}>
      <Image
        source={img}
        style={{width: 40, height: 40}}
      />
    </TouchableOpacity>
  )
}

export default AbsoluteRightButton;
