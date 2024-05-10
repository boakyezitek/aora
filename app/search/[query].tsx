import {
  View,
  Text,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenView from "@/components/ScreenView";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import { Posts } from "@/types/PostType";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Query = () => {
  const {query } = useLocalSearchParams()
  const { data: posts, refetch: refetchPost } = useAppwrite(() => searchPosts(query), Posts);
  
  useEffect(() => {
    refetchPost()
  }, [query])
  return (
    <ScreenView withoutScrollView={true}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
           
                <Text className="font-pmedium text-sm text-gray-100">
                  Search result
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                 {query}
                </Text>
                <View className="mt-6 mb-8">
                <SearchInput initialQuery={query}  />
                </View>
                
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle={`No videos found for "${query}"`}
          />
        )}
      />
    </ScreenView>
  );
};

export default Query;
