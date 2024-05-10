import { View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

interface ScreenProps {
  children: React.ReactNode,
  isCentered?: boolean,
  withoutScrollView?: boolean,
}

const ScreenView = ({isCentered, withoutScrollView, children}: ScreenProps) => {
  if(withoutScrollView) {
    return (
      <SafeAreaView className="h-full"  style={{backgroundColor: '#161622'}}>
        <View className={`w-full min-h-[100%] px-4 my-6 ${isCentered ? 'items-center justify-center' : 'justify-center'}`}>
        {children}
        </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className="h-full"  style={{backgroundColor: '#161622'}}>
      <ScrollView >
        <View className={`w-full min-h-[85vh] px-4 my-6 ${isCentered ? 'items-center justify-center' : 'justify-center'}`}>
        {children}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default ScreenView