import { View, Text, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { images } from '../../constants'

const Home = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text className='text-white'>{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className='mt-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>

                <View>
                  <Text className='text-sm font-pmedium text-gray-100'>
                    Welcome back
                  </Text>
                  
                  <Text className='text-2xl font-psemibold text-white'>
                    stackfloat
                  </Text>
                </View>

                <View className='mt-2'>
                  <Image
                    className='w-9 h-10'
                    source={images.logoSmall}
                    resizeMode='contain'
                  />
                </View>
              </View>


            </View>
          )}
        />
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default Home