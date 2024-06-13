import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalContext';

export default function App() {

  const {isLoading, isLogedIn} = useGlobalContext();
  if (!isLoading && isLogedIn) return <Redirect href='/home' />

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4'>
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

          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push(`/sign-in`)}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
