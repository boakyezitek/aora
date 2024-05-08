import { StatusBar, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar  barStyle="auto" />
      <Link href="/profile" className="text-blue-500">Go to profile</Link>
    </View>
  )
}

export default App