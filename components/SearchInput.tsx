import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";

interface FormFieldProps {
    value: string;
    handleChangeText: (text: string) => void;
    otherStyle?: string;
    keyBoardType?: string;
    placeholder?: string;
}

const SearchInput = ({
    value,
    handleChangeText,
    otherStyle,
    keyBoardType,
    placeholder,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    return (
            <View className="border-2 border-black-200 w-full flex-row h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4 ">
                <TextInput
                    className="text-base mt-0.5 text-white flex-1 font-pregular"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                />
                 <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
                    </TouchableOpacity>
            </View>

    );
};

export default SearchInput;
