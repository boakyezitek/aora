import { View, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

interface FormFieldProps {
    value: string;
    handleChangeText: (text: string) => void;
    otherStyle?: string;
    keyBoardType?: string;
    placeholder?: string;
    initialQuery?: string;
}

const SearchInput = ({
    value,
    handleChangeText,
    otherStyle,
    keyBoardType,
    placeholder,
    initialQuery,
}: FormFieldProps) => {

    const pathname = usePathname()
    const [query, setQuery] = useState<string>(initialQuery || '');
    
    return (
            <View className="border-2 border-black-200 w-full flex-row h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4 ">
                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={(e) => setQuery(e)}
                />
                 <TouchableOpacity onPress={() => {
                    if(!query) {
                        return Alert.alert('Missing query', "Please input something to search results accross database")
                    }
                    if(pathname.startsWith('/search')) {
                        router.setParams({query: query})
                    } else {
                        router.push(`/search/${query}`)
                    }
                 }}>
                        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
                    </TouchableOpacity>
            </View>

    );
};

export default SearchInput;
