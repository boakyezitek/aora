import { Alert, Text, View } from 'react-native'
import React from 'react'
import ScreenView from '@/components/ScreenView'
import LogoView from '@/components/LogoView'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { registerUser } from '@/lib/appwrite'

type FormData = {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [form, setForm] = React.useState<FormData>({
    username: '',
    email: '',
    password: ''
  })
  
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const submit = async() => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all fields')
    }
    setIsSubmitting(true);

    try {
      await registerUser(form.email, form.password, form.username);

      Alert.alert('Success', 'User signed up successful')
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
      <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up to Aora</Text>
      <FormField title="Username" value={form.username} handleChangeText={(e: string) => setForm({ ...form, username: e })}
        otherStyle="mt-7"
      />
            <FormField title="Email" value={form.email} handleChangeText={(e: string) => setForm({ ...form, email: e })}
        otherStyle="mt-7"
        keyBoardType="email-address"
      />
      <FormField title="Password" value={form.password} handleChangeText={(e: string) => setForm({ ...form, password: e })}
        otherStyle="mt-7"
      />
      <CustomButton title='Sign Up' handlePress={submit} 
      containerStyles={{ backgroundColor: '#FF9C01', marginTop: 20 }}
      textStyles={{ color: '#161622', fontSize: 20 }} 
      isLoading={isSubmitting}
      />
      <View className="justify-center pt-5 flex-row gap-2">
        <Text className="text-gray-100 text-lg font-pregular">Already have an account?</Text>
        <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
      </View>
    </ScreenView>
  )
}

export default SignUp