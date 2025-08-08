import { View, Text, ScrollView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { images } from '../../constants'
import SearchBox from '../../components/SearchBox'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllVideos, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/UseAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalContext'
import { router } from 'expo-router'

const Home = () => {

  const { user } = useGlobalContext();

  const { data: posts, isLoading, refetch } = useAppwrite(getAllVideos);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      { console.log('came home') }
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard 
            post={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='mt-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>

              <View>
                <Text className='text-sm font-pmedium text-gray-100'>
                  Welcome back,
                </Text>

                <Text className='text-2xl font-psemibold text-white'>
                  {user?.username}
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

            <SearchBox
              placeholder='Search for a video'
            />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Trending Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='Be the first to create'
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default Home;