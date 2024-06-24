import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'

const TextBox = ({ title, value, handleTextChange,
  styles, inputeType, placeholder, required, ...props }) => {

  const [showPasword, setshowPasword] = useState(false)

  return (
    <View className={`space-y-2 ${styles}`}>
      <View className='flex-row'>
        <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
        {
        required && (
          <Text 
          className='text-base text-red-600 font-pmedium mt-0.5'
          > *</Text>
        )}
      </View>
      <View className='border-2 border-black-200 w-full items-center
      bg-black-100 h-16 px-4 rounded-2xl focus:border-secondary flex-row '>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          inputeType={inputeType}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleTextChange}
          secureTextEntry={title === 'Password' && !showPasword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setshowPasword(!showPasword)}>
            <Image className='w-6 h-6' resizeMode='contain'
              source={!showPasword ? icons.eye : icons.eyeHide}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default TextBox