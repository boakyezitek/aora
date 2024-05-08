import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { router, Redirect } from 'expo-router'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import ScreenView from '@/components/ScreenView'
import LogoView from '@/components/LogoView'

const App = () => {
  return (
    <ScreenView isCentered={true}>
       <LogoView />
      <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
      <View className="relative mt-5">
        <Text className="text-3xl text-white font-bold text-center">Discover Endless </Text>
        <Text className="text-3xl text-white font-bold text-center">Posibilities with
          <Text className="text-secondary-200"> Aora</Text>
        </Text>

        <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-2" resizeMode="contain" />
      </View>
      <Text className="text-gray-100 mt-7 text-center mb-10">Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
      <CustomButton
        title="Continue with Email"
        handlePress={() => router.push('/sign-in')}
        containerStyles={{ backgroundColor: '#FF9C01', marginTop: 20 }} 
        textStyles={{ color: '#161622', fontSize: 20 }} 
      />
    </ScreenView>
  )
}

export default App