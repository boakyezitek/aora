import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton';

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[270px]" resizeMode="contain" />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-xl font-psemibold text-white text-center">{title}</Text>
      <CustomButton
        title="Create video"
        handlePress={() => {}}
        containerStyles={{ backgroundColor: '#FF9C01', marginTop: 20 }} 
        textStyles={{ color: '#161622', fontSize: 20 }} 
      />
    </View>
  )
}


export default EmptyState