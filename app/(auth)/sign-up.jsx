import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import TextBox from '../../components/TextBox'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalContext'



const SignUp = () => {
  const [form, setform] = useState({
    email: '',
    password: '',
    username: ''
  });

  const { setUser, setIsLogedIn } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.username || !form.password) {
      Alert.alert('Empty field(s)', 'fill all text fields');
    } else {
      try {
        setIsSubmitting(true);

        const result = await createUser(form.username, form.email, form.password);

        setUser(result);
        setIsLogedIn(true);

        router.replace('/home');
        
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Sign up Area
          </Text>

          <TextBox
            title='Username'
            value={form.username}
            handleTextChange={(e) => setform({
              ...form,
              username: e
            })}
            styles='mt-7'
            inputeType='text'
            placeholder='Your unique username'
          />

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
            title='Sign up'
            handlePress={submit}
            containerStyles='mt-8'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              ALready have an account?
            </Text>
            <Link href='/sign-in' className='text-lg text-secondary font-psemibold'>
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
