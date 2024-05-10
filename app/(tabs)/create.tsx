import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import React from 'react'
import ScreenView from '@/components/ScreenView'
import FormField from '@/components/FormField'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

const Create = () => {
  const [uploading, setUploading] = React.useState(false)
  const [form, setForm] = React.useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })
  const { user } = useGlobalContext();
  const submit = async() => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert('Error', 'Please fill in all the fields')
    }

    setUploading(true)

    try{
      await createVideo({...form, userId: user.$id})
      Alert.alert('Success', 'Post created successfully') 
      router.push('/home')
    }
    catch(error: any) {
      Alert.alert('Error', error.message)
  }
  finally {
    setForm({
      title: '',
      video: null,
      thumbnail: null,
      prompt: ''
    })
    setUploading(false)
  }
}

  const openPicker = async (selectType: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }
  return (
    <ScreenView isCentered={false}>
      <Text className='text-2xl text-white font-psemibold mb-5' >Upload Video</Text>
      <FormField
      title='Video Title'
      value={form.title}
      placeholder='Give your video a catch title...'
      handleChangeText={(e: string) => setForm({ ...form, title: e })}
      otherStyle='mt-10'
      />

      <View className='mt-7 space-y-2'>
        <Text className='text-gray-100 font-psemibold'>Upload Video</Text>
        <TouchableOpacity onPress={() => openPicker('video')}>
          {form.video ? (
            <Video 
            source={{uri: form.video.uri}}
            resizeMode={ResizeMode.COVER}
            style={styles.video}
            />
          ): (
            <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
              <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode="contain" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View className='mt-7 space-y-2'>
      <Text className='text-gray-100 font-psemibold'>Thumbnail Image </Text>
      
      <TouchableOpacity onPress={() => openPicker('image')}>
          {form.thumbnail ? (
           <Image source={{uri: form.thumbnail?.uri}} className="w-full h-64 rounded-2xl" resizeMode="cover" />
          ): (
            <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200
            flex-row space-x-2 gap-2
            '>
                <Image source={icons.upload} className="w-5 h-5" resizeMode="contain" />
                <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>
           
            </View>
          )}
        </TouchableOpacity>

        <FormField
      title='Prompt'
      value={form.prompt}
      placeholder='The prompt you used to create the video...'
      handleChangeText={(e: string) => setForm({ ...form, prompt: e })}
      otherStyle='mt-7'
      />

      <CustomButton title='Submit & Publish' isLoading={uploading} handlePress={submit}
      containerStyles={{ backgroundColor: '#FF9C01', marginTop: 20 }}
      textStyles={{ color: '#161622', fontSize: 20 }} 
      />
      </View>
    </ScreenView>
  )
}
const styles = StyleSheet.create({
  video: {
      height: 256,
      width:'100%',
      borderRadius: 35,
    }
})

export default Create