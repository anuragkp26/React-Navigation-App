import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useLayoutEffect, useState } from "react";

export const IS_DARK_THEME = "isDarkTheme"

export const ThemeContext  = createContext({
    isDarkTheme: false,
    setAppTheme: () => {},
})



const ThemeContextProvider = ({children}) => {

    const [appTheme, setTheme] = useState()

    const setAppTheme = async (isDark) => {
        console.log('setAppTheme isDark: ', isDark);
        try {
            await AsyncStorage.setItem(IS_DARK_THEME, isDark+"");
            setTheme(isDark)
          } catch (error) {
            console.log('Error storing value: ', error);
          }
    }


    const value = {
        isDarkTheme: appTheme,
        setAppTheme: setAppTheme,
    }

    return <ThemeContext.Provider value={value} >{children}</ThemeContext.Provider>
}

export default ThemeContextProvider