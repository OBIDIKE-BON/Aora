import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


import TextBox from '../../components/TextBox'
import { icons, images } from '../../constants'
import { ResizeMode, Video } from 'expo-av'
import RequiredTitle from '../../components/RequiredTitle'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'

const Create = () => {

  const [isUpLoading, setisUpLoading] = useState(false);

  const [form, setform] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (mimeType) => {
    const result = DocumentPicker.getDocumentAsync({
      type: mimeType,
    })
  }

  const submit = () => {

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <View className='justify-between items-start flex-row'>

          <Text className='text-white text-2xl font-psemibold'>
            Upload a video
          </Text>

          <Image
            className='w-9 h-10'
            source={images.logoSmall}
            resizeMode='contain'
          />
        </View>
        <TextBox
          title='Video Title'
          value={form.title}
          placeholder='Give a catchy title...'
          handleTextChange={(e) => setform({
            ...form,
            title: e
          })}
          styles='mt-10'
          required={true}
        />

        <View className='mt-7 space-y-2'>
          <RequiredTitle
            title='Upload Video'
            titleStyle='text-base text-gray-100 font-pmedium'
            asterixStyle='text-base font-pmedium mt-0.5'
          />
          <TouchableOpacity onPress={() => openPicker(['video/mp4', 'video/gif'])}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.COVER}
                className='w-full h-64 rounded-2xl'
                useNativeControls
                isLooping
              />
            ) : (
              <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center border-2 border-black-200 items-center'>
                <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                  <Image
                    source={icons.upload}
                    className='w-1/2 h-1/2'
                    resizeMethod='contain'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <RequiredTitle
            title='Upload Thumbnail'
            titleStyle='text-base text-gray-100 font-pmedium'
            asterixStyle='text-base font-pmedium mt-0.5'
          />
          <TouchableOpacity onPress={() => openPicker(['image/jpeg', 'image/jpg', 'image/png'])}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className='w-full h-64 rounded-2xl'
              />
            ) : (
              <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                <Image
                  source={icons.upload}
                  className='w-5 h-5'
                  resizeMethod='contain'
                />
                <Text className='text-gray-100'>Select Image File</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TextBox
          title='AI Prompt'
          value={form.prompt}
          placeholder='The AI promt of your video...'
          handleTextChange={(e) => setform({
            ...form,
            prompt: e
          })}
          styles='mt-8'
          required={true}
        />

        <CustomButton
          title='Create & Publish'
          handlePress={submit}
          containerStyles='mt-10'
          isLoading={isUpLoading}
        />
      </ScrollView>
    </SafeAreaView >
  )
}

export default Create