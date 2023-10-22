import { View, Text, useColorScheme, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useTheme } from '@react-navigation/native';

export default function CustomBackButton() {

    const { colors } = useTheme();

    const navigation = useNavigation()
    
    const headerLeftIconColor = colors.iconColor


  return (
    <View style={{ flexDirection: 'row' }}>
    <Pressable onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back"
        size={24}
        color={headerLeftIconColor}
        style={{ marginLeft: 15 }}
      />
    </Pressable>
  </View>
  )
}