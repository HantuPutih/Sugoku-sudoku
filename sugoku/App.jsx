import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/Home";
import Game from "./screens/Game";
import Result from "./screens/Result";
import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './store'


const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Result" component={Result} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: -15,
    backgroundColor: 'ghostwhite',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight-15 : 0

  },
});

export default App
