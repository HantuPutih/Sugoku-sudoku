import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/Home";
import Game from "./screens/Game";
import Result from "./screens/Result";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: -15,
    backgroundColor: 'ghostwhite'
  },
});

export default App
