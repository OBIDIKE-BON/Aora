import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image className='w-[270px] h-[215px]'
        source={images.empty}
        resizeMode='contain'
      />

      <Text className='text-2xl font-psemibold text-white'>
        {title}
      </Text>

      <Text className='text-sm font-pmedium text-gray-100'>
       {subtitle}
      </Text>

      <CustomButton
        containerStyles='w-full my-6'
        title='Create now'
        handlePress={() => router.push('/create')}
      />
    </View>
  )
}

export default EmptyState