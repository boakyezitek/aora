import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Video, ResizeMode } from 'expo-av';

/**
 * @param video - The video object with the following properties:
 *    title: string
 *    thumbnail: string
 *    video: string
 *    creator: {
 *      username: string
 *      avatar: string
 *    }
 * @returns {JSX.Element} - The video card component
 */
const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: {
        username, avatar
    }
  },
}: {
  video: {
    title: string;
    thumbnail: string;
    video: string;
    creator: { username: string; avatar: string };
  };
}): JSX.Element => {
    const [play, setPlay] = useState<boolean>(false)
  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image source={{uri: avatar}} className="w-full h-full rounded-lg" resizeMode="cover"/>
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text className="text-white font-pmedium text-sm" numberOfLines={1}>{title}</Text>
                    <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>{username}</Text>
                </View>
            </View>

            <View className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain"/>
            </View>
        </View>
      {play ? (
          <Video source={{uri: video}}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if(status.didJustFinish) {
              setPlay(false)
            } 
          }}
          style={styles.video}
          />
      ): (<TouchableOpacity
      
        activeOpacity={0.7}
       style={styles.image}
        onPress={() => setPlay(true)}
      >
        <Image source={{uri: thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode="cover"/>
        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="cover"/>
        </TouchableOpacity>)}
    </View>
  );
};


const styles = StyleSheet.create({
    image: {
        display: 'flex',
        width: '100%',
        height: 240,
        marginTop: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        height: 240,
        width:'100%',
        borderRadius: 35,
        marginTop: 12,
        backgroundColor: '#ffffff4d',
      }
})
export default VideoCard;
