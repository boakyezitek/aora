import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React from "react";
import ScreenView from "@/components/ScreenView";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, logoutUser } from "@/lib/appwrite";
import { Posts } from "@/types/PostType";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const {user, setUser, setIsLogged} = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id), Posts);
  const logout = async() => {
    await logoutUser();
    setUser(null)
    setIsLogged(false)
    router.replace("/sign-in")
  }
  return (
    <ScreenView withoutScrollView={true}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
           <TouchableOpacity
           style={styles.logout}
           onPress={logout}
           >
            <Image
              source={icons.logout}
              className="w-6 h-6"
              resizeMode="contain"
            />
           </TouchableOpacity>

           <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image source={{uri: user?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>
           </View>
           <InfoBox 
           title={user?.username}
           containerStyles="mt-5"
           titleStyles="text-lg"
           />

           <View className="mt-5 flex-row items-center">
           <InfoBox 
           title={posts.length || 0}
           subtitle="Posts"
           containerStyles="mr-10 mt-5"
           titleStyles="text-xl"
           />
              <InfoBox 
           title="1.2k"
           subtitle="Followers"
           containerStyles="mt-5"
           titleStyles="text-xl"
           />
           </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle={`No videos found for "${user?.username}"`}
          />
        )}
      />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  logout: {
    width:'100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  }
})

export default Profile;
