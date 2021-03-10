import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import BoardRow from '../components/BoardRow';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function Game({ route, navigation }) {
  const [gameBoard, setGameBoard] = useState([])
  const [initialBoard, setInitialBoard] = useState([])

  function solvePress() {
    setGameBoard([])
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: initialBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response.solution)
        setGameBoard(response.solution)
      }
      )
      .catch(console.warn)
  }

  function submitPress() {
    // console.log({board});
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: gameBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status !== 'solved') {
          Alert.alert(
            response.status,
            'Check your board and try again!',
          )
        } else {
          navigation.navigate('Result', {
            username: route.params.username,
          })
        }
      }
      )
      .catch(console.warn)
  }

  function restartPress() {
    setGameBoard([])
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + route.params.difficulty)
    .then((res) => res.json() )
    .then((data) => {
      setGameBoard(data.board.map(row => [...row]))
      setInitialBoard(data.board.map(row => [...row]))
    })
  }

  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + route.params.difficulty)
    .then((res) => res.json() )
    .then((data) => {
      // let convertBoard = JSON.parse(JSON.stringify(data.board))
      setGameBoard(data.board)
      setInitialBoard(data.board.map(row => [...row]))
    })
  }, [])

  const handleInputUserToBoard = (i, j, n) => {
    // console.log(i, j, n );
    let userInputBoard = gameBoard.map(row => [...row])
    userInputBoard[i][j] = +n
    setGameBoard(userInputBoard)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headingCont}>
        <Text style={styles.heading}>Hektipeit Sudoku</Text>
        <Text>Username: {route.params.username}</Text>
        <Text>Difficulty: {route.params.difficulty}</Text>
      </View>
      <StatusBar style="auto" />
        <View style={styles.board}>
          {
            gameBoard.length !== 0 ? 
            gameBoard.map((row, rowIdx) => {
              return <BoardRow row={row} i={rowIdx} key={rowIdx} 
              handleInputUserToBoard={handleInputUserToBoard}
              initialBoardI={initialBoard[rowIdx]}
              />
            })
            : 
            <View>
              <ActivityIndicator size="large" color="#6b8e23" />
              <Text>Loading Board...</Text>
            </View>
          }
        </View>
        <View style={styles.containerBtn}>
          <View style={{margin: 10}}>
            <Button onPress={submitPress} title='validate board'></Button>
          </View>
          <View style={{margin: 10}}>
            <Button onPress={restartPress} title='load new board' color='#6b8e23'></Button>
          </View>
        </View>
          <TouchableOpacity
            style={styles.button}
            onPress={solvePress}
          >
            <Text>Give Up</Text>
          </TouchableOpacity>
    </View>
  );
}

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  heading: {
    fontSize: windowWidth /10,
    color: '#caa472',
    textShadowColor: '#797979',
    textShadowOffset: {width: 1.5, height: 1},
    textShadowRadius: 1
  },
  board: {
    borderWidth: 2,
    borderRadius: 6,
    padding: 7,
    backgroundColor: '#e5d3b3',
    width: windowWidth - 60,
    height: windowWidth - 60,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 6,

  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
  },
  headingCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 2,
  }
});
