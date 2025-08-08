import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import TextBox from '../../components/TextBox'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalContext'



const SignIn = () => {

  const [form, setform] = useState({
    email: '',
    password: ''
  });

  const { setUser, setIsLogedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Empty field(s)', 'fill all text fields');
    } else {
      try {
        setIsSubmitting(true);
        const ses = await signIn(form.email, form.password);

        const res = await getCurrentUser();

        setUser(res);
        setIsLogedIn(true);

        router.replace('/home')
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      {console.log('came to sign-in')}
      <ScrollView>
        <View className='w-full justify-center min-h-[80vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>
          <TextBox
            title='Email'
            value={form.email}
            handleTextChange={(e) => setform({
              ...form,
              email: e
            })}
            styles='mt-7'
            inputeType='email-address'
            placeholder='email@provider.com'
          />

          <TextBox
            title='Password'
            value={form.password}
            handleTextChange={(e) => setform({
              ...form,
              password: e
            })}
            styles='mt-5'
            placeholder='Enter your password'
          />

          <CustomButton
            title='Sign in'
            handlePress={submit}
            containerStyles='mt-8'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg text-secondary font-psemibold'>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
