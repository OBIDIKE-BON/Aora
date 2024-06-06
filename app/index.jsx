import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

export default function App() {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className='max-w-[300px] w-full h-[300px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white text-bold text-center font-pmedium'>
              Discover Endles Posibilities with{' '}
              <Text className='font-pbold text-4xl text-secondary-200'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[196px] h-[17px] absolute -bottom-1 -right-12'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
