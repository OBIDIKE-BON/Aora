import { View, Text } from 'react-native'
import React from 'react'

const RequiredTitle = ({title, titleStyle, asterixStyle}) => {
  return (
    <View className='flex-row'>
    <Text className={`${titleStyle}`}>
      {title}
    </Text>
    <Text className={`${asterixStyle} text-red-600`}
    > * </Text>
  </View>
  )
}

export default RequiredTitle;