import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, ScrollView, View } from 'react-native';
import Conversor from './src/pages/conversor/Conversor';
import { createStackNavigator } from '@react-navigation/stack';
import Sobre from './src/pages/sobre/sobre';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';

type RootStackParamList = {
  Conversor: undefined;
  Sobre: undefined;
};

const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: '#60965a',
    background: '#f1f1f1',
    card: '#f1f1f1',
    text: '#363636',
    border: '#f1f1f1',
    notification: '#60965a',
  },
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (fontsLoaded) {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName='Conversor'>
          <Stack.Screen name="Conversor" component={Conversor}

            options={({ navigation }: any) => ({
              headerTitleStyle: {
                fontFamily: 'Montserrat_400Regular'
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Sobre')}
                    style={styles.btnSobre}>
                    <SimpleLineIcons name="question" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen name="Sobre" component={Sobre} options={{
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontFamily: 'Montserrat_400Regular',

            }
            // headerStyle: {
            //   backgroundColor: 'red',
            // }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <View></View>
  }
}

const styles = StyleSheet.create({
  btnSobre: {
    marginRight: 15
  },
});


{/* <ScrollView>
      <View>
        <Conversor></Conversor>
        <StatusBar style="auto" />
      </View>
    </ScrollView> */}
