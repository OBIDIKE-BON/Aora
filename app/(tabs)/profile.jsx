import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import SearchBox from '../../components/SearchBox'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/UseAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalContext';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';


const Profile = () => {
  const { user, setUser, setIsLogedIn } = useGlobalContext();
  const { data: posts, isLoading, refetch } = useAppwrite(
    () => getUserPosts(user.$id)
  );

  const logout = () => {
    Alert.alert(
      'Confirm Logout', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          await signOut();
          setUser(null);
          setIsLogedIn(false);
          router.replace('/sign-in')
        }
      },
    ]);
  }

  // useEffect(() => {
  //   refetch();
  // }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            post={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity
              className='w-full items-end mb-5'
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className='w-6 h-6'
                resizeMode='contain'
              />
            </TouchableOpacity>

            <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>

              <Image
                source={{ uri: user?.avatar }}
                resizeMode='cover'
                className='w-[90%] h-[90%] rounded-lg'
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg '
            />

            <View className='mt-5 flex-row'>

              <InfoBox
                title={posts.length}
                subtitle='Posts'
                containerStyles='mr-10'
                titleStyles='text-xl'
              />

              <InfoBox
                title='1.2k'
                subtitle='Followers'
                titleStyles='text-xl'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title='No videos found'
            subtitle='No match found for your search!'
          />
        )}

      />
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default Profile;
