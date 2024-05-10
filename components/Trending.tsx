import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Posts, Post } from '@/types/PostType';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.85
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.85
  }
}

const TrendingItem = ({ activeItem, data }: { activeItem: Posts, data: Post}) => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Animatable.View
    className="mr-5"
    animation={activeItem === data.$id ? zoomIn : zoomOut}
    duration={500}
    >
      {play ? (
        <Video source={{uri: data.video}}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status) => {
          if(status.didJustFinish) {
            setPlay(false)
          } 
        }}
        style={style.video}
        />
      ): (
        <TouchableOpacity style={style.trending} activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground 
          source={{uri: data.thumbnail}}
          className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
          resizeMode='cover'
          />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain'/>
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const style = StyleSheet.create({
  trending: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    height: 288,
    width:208,
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: '#ffffff4d',
  }
})

const Trending = ({posts}: {posts: Posts}) => {
  const [activeItem, setActiveItem] = useState<Post>(posts[0])
  /**
   * Handles when the items in the list are visible. Will set the active item to
   * the first visible item in the list. If no items are visible, nothing will be
   * done.
   * 
   * @param {ViewableItemsChanged} info the information about the currently visible items
   * @returns {void}
   */
  const viewableItemsChanged = ({ viewableItems }: { viewableItems: { key: Post }[] }): void => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList data={posts} keyExtractor={item => item.$id}
    renderItem={({item}) => <TrendingItem activeItem={activeItem} data={item}/>}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 125 }}
      horizontal
    />
  )
}

export default Trending