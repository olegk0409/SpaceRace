import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

const AbsoluteLeftButton = ({img, press}) => {

  return (
    <TouchableOpacity onPress={press} style={{position: 'absolute', top: '10%', left: '5%'}}>
      <Image
        source={img}
        style={{width: 40, height: 40}}
      />
    </TouchableOpacity>
  )
}

export default AbsoluteLeftButton;
