import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TextInput, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker'


function Home({navigation}) {
  const [username, setUsername] = useState('')
  const [difficulty, setDifficulty] = useState('random')

  const onPlaySudoku = () => {
    if (!username) {
      console.log('enter username');
      alert('enter username')
    } else {
      navigation.navigate('Game', {
        username: username,
        difficulty: difficulty
      })
      // setUsername('')
      // setDifficulty('random')
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
      <Image
        style={styles.img}
        source={{
          uri: 'https://theenglishfarm.com/sites/default/files/styles/featured_image/public/harold_2.jpg?itok=uo6h4hz4',
        }}
      />
      <View style={styles.formInput}>
        <TextInput 
          placeholder='enter username'
          onChangeText={username => setUsername(username)}
          style={{ height: 50, width: 150,  fontSize: 20, }}
          value={username}
        >
        </TextInput>
        <Picker
          selectedValue={difficulty}
          style={styles.picker}
          onValueChange={(difficulty) => setDifficulty(difficulty)}
        >
          <Picker.Item label="Select Difficulty " value="random" />
          <Picker.Item label="Im a noob" value="easy" />
          <Picker.Item label="not too hard, not too easy" value="medium" />
          <Picker.Item label="this game is for kids" value="hard" />
        </Picker>
      </View>
        <Button
          title='Play sudoku'
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
    fontSize: 21,
    justifyContent: 'center',
    alignItems: "center"
  },
  formInput: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  picker: {
    height: 50, 
    width: 200,
    fontSize: 19,
    justifyContent: 'center',
    textAlign: 'center'
  },
  img: {
    width: 500,
    height: 250,
  },

});

export default Home
