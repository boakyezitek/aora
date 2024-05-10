import { Text, Alert, View } from 'react-native'
import React from 'react'
import ScreenView from '@/components/ScreenView'
import LogoView from '@/components/LogoView'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

interface FormData {
  email: string
  password: string
}

const SignIn = () => {
  const [form, setForm] = React.useState<FormData>({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const {setUser, setIsLogged} = useGlobalContext();

  const submit = async() => {
    if( !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert('Success', 'User signed in successful')
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenView>
      <LogoView />
      <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
      <FormField title="Email" value={form.email} handleChangeText={(e: string) => setForm({ ...form, email: e })}
        otherStyle="mt-7"
        keyBoardType="email-address"
      />
      <FormField title="Password" value={form.password} handleChangeText={(e: string) => setForm({ ...form, password: e })}
        otherStyle="mt-7"
      />
      <CustomButton title='Sign In' handlePress={submit} 
      containerStyles={{ backgroundColor: '#FF9C01', marginTop: 20 }}
      textStyles={{ color: '#161622', fontSize: 20 }} 
      isLoading={isSubmitting}
      />
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-gray-100 text-lg font-pregular">Don't have an account?</Text>
        <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
      </View>
    </ScreenView>
  )
}

export default SignIn
