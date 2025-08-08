import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const tabsArray = [
  { tabName: 'home', icon: icons.home, }, { tabName: 'bookmark', icon: icons.bookmark, },
  { tabName: 'create', icon: icons.plus, }, { tabName: 'profile', icon: icons.profile, },
]

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='h-6 w-6'
      />
      <Text 
        className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
        style={{ color: color }} 
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 74,
          },
        }}
      >
        {tabsArray.map((item) => {
          return (
            <Tabs.Screen
              key={item.tabName}
              name={item.tabName}
              options={{
                title: capitalize(item.tabName),
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={item.icon}
                    color={color}
                    name={capitalize(item.tabName)}
                    focused={focused}
                  />
                )
              }}
            />
          );
        })}
      </Tabs>
    </>
  )
}

export default TabsLayout
