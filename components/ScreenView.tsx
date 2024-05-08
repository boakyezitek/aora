import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

interface ScreenProps {
  children: React.ReactNode,
  isCentered?: boolean
}

const ScreenView = ({isCentered, children}: ScreenProps) => {
  return (
    <SafeAreaView className="h-screen"  style={{backgroundColor: '#161622'}}>
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className={`w-full min-h-[85vh] px-4 my-6 ${isCentered ? 'items-center justify-center' : 'justify-center'}`}>
        {children}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default ScreenView