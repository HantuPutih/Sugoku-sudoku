import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TextInput, Image, Dimensions, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { setGameBoard, setUsername, setDifficulty } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux'


const windowWidth = Dimensions.get('window').width;


function Home({navigation}) {
  const {username} = useSelector(state => state.userData)
  const {difficulty} = useSelector(state => state.userData)

  const dispatch = useDispatch()

  const onPlaySudoku = () => {
    dispatch(setGameBoard([]))
    if (!username) {
      Alert.alert(null,'Enter Username!')
    } else {
      navigation.navigate('Game')
      // , {
      //   username: username,
      //   difficulty: difficulty
      // })
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.heading}>
          Welcome to Hektipeit Sugoku Sudoku
        </Text>
        <Text style={{fontSize: 18}}>
          enter username and difficulty
        </Text>
      </View>
      <View style={styles.imgCont}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://theenglishfarm.com/sites/default/files/styles/featured_image/public/harold_2.jpg?itok=uo6h4hz4',
          }}
        />
      </View>
      
      <View style={styles.formInput}>
        <TextInput 
          placeholder='enter username'
          onChangeText={username => dispatch(setUsername(username))}
          style={{ height: 50, width: 150,  fontSize: 20, }}
          value={username}
        >
        </TextInput>
        <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={(difficulty) => dispatch(setDifficulty(difficulty))}
        >
          <Picker.Item label="Select Difficulty " value="random" />
          <Picker.Item label="Im a noob" value="easy" />
          <Picker.Item label="Not too hard, Not too easy" value="medium" />
          <Picker.Item label="This game is for kids!" value="hard" />
        </Picker>
      </View>
        <Button
          title='Play Sudoku'
          onPress={onPlaySudoku}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  heading: {
    fontWeight: 'bold',
    fontSize: windowWidth / 19,
    justifyContent: 'center',
    alignItems: "center",
  },
  formInput: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    backgroundColor: 'ghostwhite',
    paddingHorizontal: windowWidth / 5.6,
    borderRadius: 3,

  },
  picker: {
    height: 50, 
    width: 200,
    fontSize: 19,
    justifyContent: 'center',
    textAlign: 'center',

  },
  img: {
    width: windowWidth -50,
    height: windowWidth / 2,
    borderRadius: 10,
  },
  imgCont: {
    elevation: 6,
    backgroundColor: 'white',
    borderRadius: 10,
  }
});

export default Home
