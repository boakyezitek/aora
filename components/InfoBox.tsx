import { View, Text } from 'react-native'
import React from 'react'

/**
 * InfoBox component
 *
 * @param {string} title The title of the info box
 * @param {string} [subtitle] The subtitle of the info box
 * @param {string} [containerStyles] The styles for the container view
 * @param {string} [titleStyles] The styles for the title text
 * @returns {JSX.Element} The InfoBox component
 */
const InfoBox = ({ title, subtitle, containerStyles = '', titleStyles = '' }: {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}): JSX.Element => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">{subtitle}</Text>
    </View>
  )
}


export default InfoBox