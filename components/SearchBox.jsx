import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchBox = ({ initialQuery }) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View className='border-2 border-black-200 w-full items-center
      bg-black-100 h-16 px-4 rounded-2xl focus:border-secondary flex-row space-x-4'>
      <TextInput
        className='flex-1 text-white font-pregular text-base mt-0.5 '
        value={query}
        placeholder={'Search for a video'}
        placeholderTextColor='#CDCDE0'
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={() => {
        if (!query) {
          Alert.alert('Error', 'Search field is Empty, Type a topic to search')
        }

        if (pathname.startsWith('/search')) {
          router.setParams({ query })
        } else {
          router.push(`/search/${query}`)
        }

      }}>
        <Image className='w-5 h-5' resizeMode='contain'
          source={icons.search}
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBox;