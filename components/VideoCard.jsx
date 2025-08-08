import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ post: { title, thumbnail, video, creator: { username, avatar } } }) => {

  const [play, setPlay] = useState(false)

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row items-start gap-3'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] roundedlg border border-secondary justify-center items-center p-0.5'>
            <Image className='h-full w-full rounded-lg'
              source={{ uri: avatar }}
              resizeMode='cover'
            />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-psemibold text-sm' numberOfLines={1} >
              {title}
            </Text>

            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className='pt-2'>
          <Image className='h-5 w-5'
            source={icons.menu}
            resizeMode='contain'
          />
        </View>
      </View>

      {
        play ? (
          <Video
          posterSource={thumbnail}
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          />
        ) : (
          <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center' activeOpacity={0.7}
          onPress={() => setPlay(true) }>
            <Image
              source={{ uri: thumbnail }}
              className='w-full h-full rounded-xl mt-3'
              resizeMode='cover'
            />
            <Image
              source={icons.play}
              className='w-12 h-12 absolute'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )
      }

    </View>
  )
}

export default VideoCard;