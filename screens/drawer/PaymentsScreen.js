import { View, Text, Pressable, useColorScheme } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import CustomBackButton from '../../components/CustomBackButton';

export default function PaymentsScreen() {

  const { colors } = useTheme();

  const navigation = useNavigation();


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       // <Pressable onPress={() => navigation.goBack()}>
  //         <Ionicons name="arrow-back" size={24}  style={{ marginStart: 14}}/>
  //       // </Pressable>
  //     ),
  //   });
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>  <CustomBackButton />,
    });
  }, []);

  return (
    <View>
      <Text style={{ color : colors.text}} >PaymentsScreen</Text>
    </View>
  )
}